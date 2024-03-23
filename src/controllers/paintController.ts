import dotenv from 'dotenv';
dotenv.config();

import Paint from '../models/Paint';
import asyncHandler from 'express-async-handler';

export const fetch_paints = [
    asyncHandler(async (req, res, _next) => {
        const paints = await Paint.find();
        res.status(200).json({
            success: true,
            paints,
        });
    })
];

export const update_paints = [
    asyncHandler(async (req, res, _next) => {
        // delete old paint instance
        const count = await Paint.count();
        if (count) {
            const oldPaint = await Paint.findOne();
            await oldPaint?.deleteOne();
        }

        // create new paint instance with new stock
        const updatedPaint = new Paint({
            blue: req.body.blue,
            grey: req.body.grey,
            black: req.body.black,
            white: req.body.white,
            purple: req.body.purple,
            blueStatus: req.body.blueStatus,
            greyStatus: req.body.greyStatus,
            blackStatus: req.body.blackStatus,
            whiteStatus: req.body.whiteStatus,
            purpleStatus: req.body.purpleStatus,
        });
        await updatedPaint.save();
    
        res.status(200).json({
            success: true,
            message: 'Paint quantities updated.',
            updatedPaint,
        });
    })
];

export const init_paints = [
    asyncHandler(async (req, res, _next) => {
        const count = await Paint.count();

        // create Paint instance if none exists
        if(!count){
            const paints = new Paint();
            await paints.save();
        }

        res.status(200).json({
            message: `Paints initialized.`,
        });
    }),
];