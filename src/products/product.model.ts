import * as mongoose from 'mongoose'; 

const Schema = mongoose.Schema;

export const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    builder: {
        type: Schema.Types.ObjectId,
        ref: "Builder"
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: "City"
    }
}).index({
    title: "text"
}); 

export interface Product extends mongoose.Document {
    id: string,
    title: string,
    description: string,
    price: number
}