
// user CRUD controller

import { Request, Response } from 'express';
import Users from '@models/users.model';
import User from '@interfaces/users.interface';
import bcrypt from 'bcryptjs';
import { BCRYPT_SALT } from '@config';


// creating user signup

export const create = async (req: Request, res: Response): Promise<Response>=>{
    const body: User = req.body;

    try {
        const { email, password } = body;
        const existingUser = await Users.findOne({ email });
        // extra validating
        if (existingUser) {
            return res.status(409).json({ success: false, message: "User already exists." });
        }
        // Getting url of the image 
        if (req.file) {
            body.photo = req.file.path;

        }
        // Creating User 
        body.password = bcrypt.hashSync(password, BCRYPT_SALT);
        const user = await Users.create(body);
        // Done 
        return res.json({ succes: true, user })
    } catch (err) {
        console.log("Error------>", err);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// getting all users by id

export const getById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const userId = req.params.userId; // getiing user id from url parameter
        const user = await Users.findById(userId);
        return res.json({ success: true, user });
    } catch (err) {
        console.log('Error------->', err);
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
};

// update 
export const update = async (req: Request, res: Response): Promise<Response>=>{
    const body = req.body;
    
    try {
        const userId = req.params.userId;// getting user id from URL parameter

        // IF user eant to update it's password
        if (body.password) {
            body.password = bcrypt.hashSync(body.password, BCRYPT_SALT);
        }

        const user = await Users.findByIdAndUpdate(userId, body, { new: true }); //updating the user 
        return res.json({ succcess: true, user });

    } catch (err) {
        console.log('Error ----->', err);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    
    try {
        const userId = req.params.userId;
        const user = await Users.findByIdAndDelete(userId);
        return res.json({ success: true, user });

    } catch (err) {
        console.log("Error ------> ", err);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }

};