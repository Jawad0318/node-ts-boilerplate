import { Request, Response } from 'express';
import IRequest from '@interfaces/request.interface';
import Auth, { ChangePassword } from '@interfaces/auth.interface';
import Users from '@models/users.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendEmail } from '@utils/sendEmail';
import { JWT_SECRET, BCRYPT_SALT } from '@config';

export const login = async (req: Request, res: Response): Promise<Response> => {
    const body: Auth = req.body;
    try {
        // Getting email and password 
        const { email, password } = body;
        //Getting user from db
        const user = await Users.findOne({ email });

        if (!user) {
            // If user not found 
            return res.status(404).json({ success: false, message: 'user not found' });
        }
        // comparing Password
        const isMatched = bcrypt.compareSync(password, user.password);

        if (!isMatched) {
            //If passsword not matched
            return res.status(400).json({ success: false, message: 'Invalid Password' });
        }
        // Creating payload with user object
    // @ts-expect-error

        delete user.password; // removing password from user object
        const payload = { user };
        //Generating token 
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });

        return res.json({ success: true, user, token });
    } catch (err) {
        //Error handling
        //eslint-disable-next-line no-console
        console.log('err---->', err);
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
};

export const changePassword = async (req: Request, res: Response): Promise<Response> => {
    const { userId } = req.params;
    const body: ChangePassword = req.body;
    try {
        const { oldPassword, newPassword, confirmPassword } = body;
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'New password and confirm password are not same ',
            });
        }

        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found " });
        }
        const isMatched = bcrypt.compareSync(oldPassword, user.password);
        if (!isMatched) {
            return res.status(404).json({ success: false, message: "Invalid Old Password" });
        }
        //Generate token
        user.password = bcrypt.hashSync(newPassword, BCRYPT_SALT);
        await user.save();
        return res.json({ success: true, user });
    } catch (err) {
        console.log("Error------>", err);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// forget password

export const forgot = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email } = req.params;
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'user not found' });
        }
        // generating random passwoerd
        const randomPassword = Math.random().toString(36).slice(-8);

        // sending email to user

        await sendEmail(email, randomPassword);

        // IF email is sent then we have to update the password in db
        user.password = await bcrypt.hash(randomPassword, BCRYPT_SALT);
        await user.save();
        // Done

        return res.json({ success: true, message: "email sent successfully" });

    } catch (err) {
        console.log('Error -------->', err);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// confirm auth

export const confirmAuth = (req: IRequest, res: Response): Response => {
    // if user authenticated
    return res.json({ success: true, user: req.user });
};