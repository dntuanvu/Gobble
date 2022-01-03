import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './user.model';

import { createCipheriv, randomBytes, scrypt, createDecipheriv } from 'crypto';

@Injectable()
export class UsersService {
    
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async findOne(username: string) {
        return await this.userModel.findOne({ username: username })
    }

    async createUser(username: string, password: string, email: string, firstName: string, lastName: string, key: Buffer, iv: Buffer) {
        const newUser = new this.userModel({
            username,
            password,
            email,
            firstName,
            lastName,
            key, iv
        });

        const result = await newUser.save();
        return result.id; 
    }
}
