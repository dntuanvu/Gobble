import * as mongoose from 'mongoose'; 

const Schema = mongoose.Schema;

export const BuilderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    projects: [{
        type: String,
        ref: "Product"
    }]
}).index({
    name: 'text'
}); 

export interface Builder extends mongoose.Document {
    id: string,
    name: string,
    description: string
}