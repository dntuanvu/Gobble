import { Module } from '@nestjs/common';
import { MongooseModule }  from '@nestjs/mongoose'

import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { HomeModule } from './home/home.module'

import { CitiesModule } from './cities/cities.module'
import { BuildersModule } from './builders/builders.module'
import { ProductsModule } from './products/products.module'

import { JwtAuthGuard } from './auth/jwt-auth.guard'

@Module({
  imports: [
    CitiesModule,
    BuildersModule,
    ProductsModule,
    MongooseModule.forRoot(
      'mongodb://mongodb:27017/nestjs-demo'
    ),
    AuthModule,
    UsersModule,
    HomeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}