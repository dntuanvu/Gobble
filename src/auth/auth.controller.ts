import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}
    
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(
        @Body('username') username: string,
        @Body('password') password: string,) {
        return this.authService.login(username, password);
    }

    @Post('register')
    async register(
        @Body('username') username: string,
        @Body('password') password: string,
        @Body('email') email: string,
        @Body('first_name') firstName: string,
        @Body('last_name') lastName: string) {

        return this.authService.register(username, password, email, firstName, lastName);
    }

}