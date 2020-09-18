import { Controller, Get, Post, Body, Query, Param, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':id')
    getUser(@Param('id') id: number): Promise<User> {
        return this.userService.getUserById(id);
    }

    @Post()
    addUser(@Body() user: User) {
        return this.userService.createUser(user);
    }
}
