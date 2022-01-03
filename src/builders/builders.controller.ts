import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BuildersService } from './builders.service'

@Controller('builders')
export class BuildersController {

    constructor(private readonly buildersService: BuildersService) {}

    @UseGuards(JwtAuthGuard)
    @Post() 
    async addBuilder(@Body('name') name: string, @Body('description') desc: string) {
        console.log("Creating new builder in controller")
        const generatedId = await this.buildersService.insertBuilder(name, desc);
        return { id: generatedId }; 
    }

    @Get()
    async getAllBuilders() {
        const cities = await this.buildersService.getAllBuilders();
        return cities;
    }

    @Get(':id')
    getBuilder(@Param("id") id) {
        return this.buildersService.getSingleBulder(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(":id")
    async updateBuilder(@Param("id") id, @Body('name') name: string, @Body('description') desc: string) {
        await this.buildersService.updateBuilder(id, name, desc);
        return null;
    }

}