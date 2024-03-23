import dotenv from 'dotenv';
dotenv.config();

import asyncHandler from 'express-async-handler';

export const fetch_paints = [
    asyncHandler((req, res, _next) => {

        res.status(200).json({
            success: true,
        });
    })
];

export const update_paints = [
    asyncHandler(async (req, res, _next) => {

        res.status(200).json({
            success: true,
        });
    })
];
