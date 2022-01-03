import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { HomeController } from './home.controller'
import { HomeService } from './home.service'

import { UserSchema } from '../users/user.model'
import { CitySchema } from '../cities/city.model'
import { BuilderSchema } from '../builders/builder.model'
import { ProductSchema } from '../products/product.model'

import { CitiesService } from '../cities/cities.service'
import { BuildersService } from '../builders/builders.service'
import { ProductsService } from '../products/products.service'

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'User',
                schema: UserSchema
            },
            {
                name: 'City',
                schema: CitySchema
            },
            {
                name: 'Builder',
                schema: BuilderSchema
            },
            {
                name: 'Product',
                schema: ProductSchema
            }
        ])
    ],
    controllers: [HomeController],
    providers: [
        HomeService,
        CitiesService,
        BuildersService,
        ProductsService
    ],
})
export class HomeModule {}