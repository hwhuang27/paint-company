import { Schema, model, Types } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface IPaint {
    _id: Types.ObjectId;
    color: string;
    quantity: number;
}

// 2. Create a Schema corresponding to the document interface.
const paintSchema = new Schema<IPaint>({
    color: {
        type: String,
        required: true,
        maxLength: 50,
        unique: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});

// 3. Create and export MongoDB model.
const Paint = model<IPaint>('Paint', paintSchema);

export default Paint;