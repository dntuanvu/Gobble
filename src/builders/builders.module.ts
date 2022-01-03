import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { BuildersController } from './builders.controller'
import { BuildersService } from './builders.service'
import { BuilderSchema } from './builder.model'

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: 'Builder',
            schema: BuilderSchema
        }])
    ],
    controllers: [BuildersController],
    providers: [BuildersService],
})
export class BuildersModule {}