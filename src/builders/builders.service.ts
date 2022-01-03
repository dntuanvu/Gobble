import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Builder } from './builder.model'

@Injectable()
export class BuildersService {

    constructor(@InjectModel('Builder') private readonly builderModel: Model<Builder>) {}

    async searchBuilder(searchStr: string) {
        const result = await this.builderModel.find({
            name: {$regex: searchStr}
        }).limit(5)

        return result.map(res => ({
            id: res.id,
            name: res.name
        }))
    }

    async insertBuilder(name: string, desc: string) {
        const newBuilder = new this.builderModel({
            name,
            description: desc
        });

        const result = await newBuilder.save();
        return result.id as string; 
    }

    async getAllBuilders() {
        const builders = await this.builderModel.find().exec();
        return builders.map(prod => ({
            id: prod.id,
            name: prod.name,
            description: prod.description
        }))
    }

    async getSingleBulder(id: string) {
        const builder = await this.findBuilder(id);
        if (!builder) {
            throw new NotFoundException('Could not find builder.'); 
        }

        return {
            id: builder.id,
            name: builder.name,
            description: builder.description
        };
    }

    async updateBuilder(id: string, name: string, desc: string) {
        const updatedBuilder = await this.findBuilder(id); 

        if (name) { updatedBuilder.name = name; }
        if (desc) { updatedBuilder.description = desc; }

        updatedBuilder.save();
    }

    private async findBuilder(id: string): Promise<Builder> {
        let builder;
        try {
            builder = await this.builderModel.findById(id);
        } catch (error) {
            throw new NotFoundException('Could not find builder.'); 
        }
        
        return builder
    }

}