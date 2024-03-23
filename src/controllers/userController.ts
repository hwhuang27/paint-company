import dotenv from 'dotenv';
dotenv.config();

import asyncHandler from 'express-async-handler';
import { jwtEncoded, jwtDecoded } from '../auth/jwtConfig';
import User from '../models/User';

export const fetch_self = [
    asyncHandler((req, res, _next) => {
        const user = req.user as jwtDecoded;

        const result: jwtEncoded = {
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            role: user.role,
        };

        res.status(200).json({
            success: true,
            user: result,
        });
    })
];

export const fetch_users = [
    asyncHandler(async (req, res, _next) => {
        const user = req.user as jwtDecoded;

        // returns all users minus current user
        const users = await User
            .find({ email: { $nin: user.email } })
            .select({ password: 0 });

        res.status(200).json({
            success: true,
            users: users,
        });
    })
];
