import * as mongoose from 'mongoose'; 

const Schema = mongoose.Schema;

export const CitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    projects: [{
        type: String,
        ref: "Product"
    }]
}).index({
    name: 'text'
}); 

export interface City extends mongoose.Document {
    id: string,
    name: string
}