import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProductsService } from './products.service'

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @UseGuards(JwtAuthGuard)
    @Post() 
    async addProduct(@Body('title') prodTitle: string, @Body('description') prodDesc: string, @Body('price') prodPrice: number) {
        const generatedId = await this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
        return { id: generatedId }; 
    }

    @Get()
    async getAllProducts() {
        const products = await this.productsService.getAllProducts();
        return products;
    }

    @Get(':id')
    getProduct(@Param("id") productId) {
        return this.productsService.getSingleProduct(productId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(":id")
    async updateProduct(@Param("id") productId, @Body('title') prodTitle: string, @Body('description') prodDesc: string, @Body('price') prodPrice: number) {
        await this.productsService.updateProduct(productId, prodTitle, prodDesc, prodPrice);
        return null;
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    async deleteProduct(@Param('id') prodId: string) {
        await this.productsService.deleteProduct(prodId);
        return null;
    }

    @UseGuards(JwtAuthGuard)
    @Post('assign/:type') 
    async assignProductToBuilder(@Param("type") type: string, @Body('mainId') mainId: string, @Body('projectId') productId: string) {
        if (type === 'builder') {
            console.log("builder assignment")
            await this.productsService.assignProductToBuilder(mainId, productId);
        } else if (type === 'city') {
            console.log("city assignment")
            await this.productsService.assignProductToCity(mainId, productId);
        }
        
        return null;
    }
}