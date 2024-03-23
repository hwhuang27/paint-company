import { Schema, model, Types } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface IUser{
    _id: Types.ObjectId;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    role: "Painter" | "Manager" | "Admin";
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        maxLength: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        maxLength: 100,
    },
    first_name: {
        type: String,
        maxLength: 50,
        required: true,
    },
    last_name: {
        type: String,
        maxLength: 50,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["Painter", "Manager", "Admin"],
        default: "Painter",
    },
});

userSchema.virtual("url").get(function () {
    return `user/${this._id}`;
});

// 3. Create and export MongoDB model.
const User = model<IUser>('User', userSchema);

export default User;