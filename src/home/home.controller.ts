import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { CitiesService } from '../cities/cities.service'
import { BuildersService } from '../builders/builders.service'
import { ProductsService } from '../products/products.service'

@Controller()
export class HomeController {

    constructor(
        private readonly citiesService: CitiesService,
        private readonly buildersService: BuildersService,
        private readonly productsService: ProductsService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('searchall/:queryStr') 
    async searchAll(@Param('queryStr') queryStr: string) {
        const cities = await this.citiesService.searchCity(queryStr);
        //console.log("cities=" + cities);
        const builders = await this.buildersService.searchBuilder(queryStr);
        //console.log("builders=" + builders);
        const products = await this.productsService.searchProduct(queryStr);
        //console.log("products=" + products);

        return { 
            City: cities,
            Project: products,
            Builder: builders
         }; 
    }

}