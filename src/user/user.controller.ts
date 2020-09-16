import { Controller, Get, Post, Body, Query, Param, BadRequestException } from '@nestjs/common';
import { User, UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getUser(@Query('token') token: string): User {
        return this.userService.getUser(token);
    }

    @Post()
    addUser(
        @Body('name') name: string,
        @Body('password') password: string,
    ) {
        return this.userService.createUser(name, password);
    }

    @Get('auth')
    authenticate(
        @Query('name') name: string,
        @Query('pw') password: string,
    ) {
        if (!name || !password) {
            throw new BadRequestException();
        }
        return this.userService.authenticate(name, password);
    }
}