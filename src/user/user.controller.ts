import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';

import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    getUser(@Req() req): Promise<User> {
        return this.userService.getUserById(req.user.userId);
    }

    @Post()
    addUser(@Body() user: User) {
        return this.userService.createUser(user);
    }
}
