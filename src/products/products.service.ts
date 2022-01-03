import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Product } from './product.model'
import { City } from '../cities/city.model'
import { Builder } from '../builders/builder.model'

@Injectable()
export class ProductsService {

    constructor(
        @InjectModel('City') private readonly cityModel: Model<City>,
        @InjectModel('Builder') private readonly builderModel: Model<Builder>,
        @InjectModel('Product') private readonly productModel: Model<Product>
    ) {}

    async searchProduct(searchStr: string) {
        const result = await this.productModel.find({
            title: {$regex: searchStr.toLowerCase()}
        }).limit(5)

        return result.map(res => ({
            id: res.id,
            name: res.title
        }))
    }

    async insertProduct(title: string, desc: string, price: number) {
        const newProduct = new this.productModel({
            title,
            description: desc,
            price
        });

        const result = await newProduct.save();
        return result.id as string; 
    }

    async assignProductToBuilder(builderId, productId) {
        return await this.builderModel.findByIdAndUpdate(
            builderId,
            {
                $push: {
                    projects: productId
                }
            },
            { new: true, useFindAndModify: false }
        );
    };

    async assignProductToCity(cityId, productId) {
        return await this.cityModel.findByIdAndUpdate(
            cityId,
            {
                $push: {
                    projects: productId
                }
            },
            { new: true, useFindAndModify: false }
        );
    };

    async getAllProducts() {
        const products = await this.productModel.find().exec();
        return products.map(prod => ({
            id: prod.id,
            title: prod.title,
            description: prod.description,
            price: prod.price
        }))
    }

    async getSingleProduct(productId: string) {
        const product = await this.findProduct(productId);
        if (!product) {
            throw new NotFoundException('Could not find product.'); 
        }

        return {
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price
        };
    }

    async updateProduct(productId: string, title: string, desc: string, price: number) {
        const updatedProduct = await this.findProduct(productId); 

        if (title) { updatedProduct.title = title; }
        if (desc) { updatedProduct.description = desc; }
        if (price) { updatedProduct.price = price; }

        updatedProduct.save();
    }

    async deleteProduct(productId: string) {
        const result = await this.productModel.deleteOne({ _id: productId });
        /*if (result.n === 0) {
            throw new NotFoundException('Could not find product.'); 
        }*/
    }

    private async findProduct(id: string): Promise<Product> {
        let product;
        try {
            product = await this.productModel.findById(id);
        } catch (error) {
            throw new NotFoundException('Could not find product.'); 
        }
        
        return product
    }

}