import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CitiesService } from './cities.service'

@Controller('cities')
export class CitiesController {
    constructor(private readonly citiesService: CitiesService) {}

    @UseGuards(JwtAuthGuard)
    @Post() 
    async addCity(@Body('name') name: string) {
        const generatedId = await this.citiesService.insertCity(name);
        return { id: generatedId }; 
    }

    @Get()
    async getAllCities() {
        const cities = await this.citiesService.getAllCities();
        return cities;
    }

    @Get(':id')
    getCity(@Param("id") cityId) {
        return this.citiesService.getSingleCity(cityId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(":id")
    async updateCity(@Param("id") id, @Body('name') name: string) {
        await this.citiesService.updateCity(id, name);
        return null;
    }
}