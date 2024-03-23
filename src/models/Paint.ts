import { Schema, model, Types } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface IPaint {
    _id: Types.ObjectId;
    blue: number;
    grey: number;
    black: number;
    white: number;
    purple: number;
    blueStatus: "available" | "low" | "none";
    greyStatus: "available" | "low" | "none";
    blackStatus: "available" | "low" | "none";
    whiteStatus: "available" | "low" | "none";
    purpleStatus: "available" | "low" | "none";
}

// 2. Create a Schema corresponding to the document interface.
const paintSchema = new Schema<IPaint>({
    blue: {type: Number, required: true, default: 0, },
    grey: {type: Number, required: true, default: 0, },
    black: {type: Number, required: true, default: 0, },
    white: {type: Number, required: true, default: 0, },
    purple: {type: Number, required: true, default: 0, },
    blueStatus: {
        type: String,
        enum: ["available", "low", "none"],
        required: true,
        default: "none",
    },
    greyStatus: {
        type: String,
        enum: ["available", "low", "none"],
        required: true,
        default: "none",
    },
    blackStatus: {
        type: String,
        enum: ["available", "low", "none"],
        required: true,
        default: "none",
    },
    whiteStatus: {
        type: String,
        enum: ["available", "low", "none"],
        required: true,
        default: "none",
    },
    purpleStatus: {
        type: String,
        enum: ["available", "low", "none"],
        required: true,
        default: "none",
    },
});

// 3. Create and export MongoDB model.
const Paint = model<IPaint>('Paint', paintSchema);

export default Paint;