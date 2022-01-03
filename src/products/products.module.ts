import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'
import { ProductSchema } from './product.model'

import { CitySchema } from '../cities/city.model'
import { BuilderSchema } from '../builders/builder.model'

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Product',
                schema: ProductSchema
            },
            {
                name: 'City',
                schema: CitySchema
            },
            {
                name: 'Builder',
                schema: BuilderSchema
            }
        ])
    ],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule {}