import asyncHandler from 'express-async-handler';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import dotenv from 'dotenv';
dotenv.config();

import { IUser } from '../models/User';
import User from '../models/User';
import { jwtEncoded, ACCESS_TOKEN_KEY } from '../auth/jwtConfig';
import '../auth/localStrategy';

export const login = [
    passport.authenticate('local', {
        failureRedirect: '/auth/loginFailure',
        session: false,
    }),
    asyncHandler(async (req, res, _next) => {
        const user = req.user as IUser;

        const payload: jwtEncoded = {
            _id: user._id.toString(),
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            role: user.role,
        };

        // generate JWT for client 
        const accessToken = jwt.sign(payload, ACCESS_TOKEN_KEY!, { expiresIn: '1d' });

        res.json({
            success: true,
            role: user.role,
            accessToken,
        });
    }),
];

export const logout = [
    asyncHandler(async (req, res, _next) => {

        res.json({
            success: true,
            message: `Successfully logged out.`,
        });
    })
];

export const register = [
    // validate form fields
    body("email")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Email must be specified.")
        .custom(async (value) => {
            const user = await User.findOne({email: value});
            if(user) throw new Error('Email is already in use');
        }),
    body("password")
        .trim()
        .isLength({ min: 1 })
        .withMessage('Password must be specified.')
        .escape(),
    body('confirm_password')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Confirm password must be specified.')
        .custom((value, { req }) => {
        return value === req.body.password;
    }),    
    body("first_name")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("First name must be specified."),
    body("last_name")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Last name must be specified."),

    asyncHandler(async (req, res, _next) => {
        // check for validation errors
        const errors = validationResult(req);
        if(!errors.isEmpty()){
                res.status(400).json({
                    message: `Error when registering`,
                    email: req.body.email,
                    errors: errors.array(),
                });
            } else {
                // hash password and save user to database
                bcrypt.hash(req.body.password, 10, async(err, hash) => {
                    if (err) throw new Error(`Password failed to hash.`);
                    
                    const user = new User({
                        email: req.body.email,
                        password: hash,
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        role: req.body.role,
                    });
                    await user.save();

                    res.status(200).json({
                        message: `User created successfully.`,
                        user,
                    });
                });
            }
    }),
];


