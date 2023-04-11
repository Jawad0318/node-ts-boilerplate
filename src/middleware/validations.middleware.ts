// all validation

import { Request, Response, NextFunction } from "express";
import { check, validationResult } from 'express-validator';

// you can create multiple validation strategies ( Read express - validator documentation for more details)
// User Signup Validation

export const validateUser = [
    check('name', 'name is required').notEmpty().trim(),
    check('email', 'Email is required').notEmpty().isEmail().trim(),
    check('password', ' Password is required').notEmpty().trim().isLength({ min: 8 }),
    check('number', 'Number is required').notEmpty().isNumeric().trim(),
    check('gender').trim(),
    check('address').trim(),
    check('city').trim(),
    check('country').trim(),

];

// user singup valdation 
export const validateUserUpdate = [
    check('name', 'Name is required.').notEmpty().trim(),
    check('email', 'Email is required.').notEmpty().isEmail().trim(),
    check('number', 'Number is required.').notEmpty().isNumeric().trim(),
    check('gender').trim(),
    check('role').trim(),
    check('address').trim(),
    check('city').trim(),
    check('country').trim(),
  ];
  
  // Login validation
  export const validateLogin = [
    check('email', 'Email is required').notEmpty().isEmail().trim().toLowerCase(),
    check('password', 'Password is required.').notEmpty().trim().isLength({ min: 8 }),
  ];
  
  // Change password validation
  export const changePasswordValidate = [
    check('oldPassword', 'Old Password is required.').notEmpty().trim().isLength({ min: 8 }),
    check('newPassword', 'New password is required.').notEmpty().trim().isLength({ min: 8 }),
    check('confirmPassword', 'Confirm password is required.').notEmpty().trim().isLength({ min: 8 }),
];
  

//result

// to check the result is validated or not according to validation strategies


export const isValidated = (req: Request, res: Response, next: NextFunction): Response | void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // on errr
        return res.status(400).json({ success: false, message: errors.array()[0].msg });
    } else {
        next();
    }
};




