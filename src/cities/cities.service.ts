import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { City } from './city.model'

@Injectable()
export class CitiesService {

    constructor(@InjectModel('City') private readonly cityModel: Model<City>) {}

    async searchCity(searchStr: string) {
        const result = await this.cityModel.find({
            name: {$regex: searchStr}
        }).limit(5)

        return result.map(res => ({
            id: res.id,
            name: res.name
        }))
    }

    async insertCity(name: string) {
        const newCity = new this.cityModel({
            name,
        });

        const result = await newCity.save();
        return result.id as string; 
    }

    async getAllCities() {
        const cities = await this.cityModel.find().exec();
        return cities.map(prod => ({
            id: prod.id,
            name: prod.name
        }))
    }

    async getSingleCity(id: string) {
        const city = await this.findCity(id);
        if (!city) {
            throw new NotFoundException('Could not find city.'); 
        }

        return {
            id: city.id,
            name: city.name
        };
    }

    async updateCity(id: string, name: string) {
        const updatedCity = await this.findCity(id); 

        if (name) { updatedCity.name = name; }

        updatedCity.save();
    }

    private async findCity(id: string): Promise<City> {
        let city;
        try {
            city = await this.cityModel.findById(id);
        } catch (error) {
            throw new NotFoundException('Could not find city.'); 
        }
        
        return city
    }

}