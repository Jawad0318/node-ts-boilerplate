import { Request, Response } from 'express';
import Admins from '@models/admins.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import IRequest from '@interfaces/admins.interface';
import Admin from '@interfaces/admins.interface';
import { JWT_SECRET, BCRYPT_SALT } from '@config';
import Auth from '@interfaces/auth.interface';


// creating Admin
export const register = async (req: Request, res: Response): Promise<Response> => {
    const body: Admin & { confirmPassword: string } = req.body;
    try {
        const { email, password, confirmPassword } = body;
        const existingAdmin = await Admins.findOne({ email });
        //extra validatons
        if (existingAdmin) {
            //if got existing user in db
            return res.status(409).json({ success: false, message: "admin already exists." });
        } else if (password !== confirmPassword) {
            //Passwords not same 
            return res.status(400).json({
                success: false,
                message: "pasword is not correct ",
            });
        }

        // create user

        body.password = bcrypt.hashSync(password, BCRYPT_SALT);  // hashing the password
        const admin = await Admins.create(body); // adding user in database
        
        // done 
        return res.json({ succes: true, admin });
    } catch (err) {
        console.log("ERR------>", err);
        return res.status(500).json({ success: false, message: "internal server error " });
    }
};

//login

export const login = async (req: Request, res: Response): Promise<Response> => {
    const body: Auth = req.body;
    try {
        const { email, password } = body;
        const admin = await Admins.findOne({ email });

        if (!admin) {
            return res.status(404).json({ success: false, message: 'admin not found' });
        } else if (!admin.active) {
            return res.status(400).json({ success: false, message: "your account is not activated " });
        }

        // compare password

        const isMatched = bcrypt.compareSync(password, admin.password);
        if (!isMatched) {
            return res.status(400).json({ suceess: false, message: "Invalid password" });
        }
        // createing payload with admin object
        //@ts-expect-error
        delete admin.password;
        const payload = { user: admin };
        // generating token 
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });
        //done

        return res.json({ success: true, admin, token });
    
    } catch (err) {
        console.log("Error----->", err);
        return res.status(500).json({ success: false, message: " internal sercer error" })
    }
};
export const confirmAuth = (req: IRequest, res: Response): Response => {
    return res.json({
        success: true, admin: req.user, token: req.token
    });
};