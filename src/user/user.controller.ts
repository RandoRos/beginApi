import { Controller, Get, Post, Body, Query, Param, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':id')
    getUser(@Param('id') id: number): Promise<User> {
        return this.userService.getUser(id);
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
        // return this.userService.authenticate(name, password);
        return 'hello';
    }
}