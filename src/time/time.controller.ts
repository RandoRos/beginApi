import { Controller, Post, Get, Param, Body, UseGuards, Request } from '@nestjs/common';
import { request } from 'https';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TimeService } from './time.service';

@Controller('time')
export class timeController {
    constructor(private readonly timeService: TimeService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(@Request() req) {
        return this.timeService.getAllUserTimes(req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getTime(
        @Request() req,
        @Param('id') timeId: number,
    ) {
        return this.timeService.getTimeForUser(timeId, req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    createTime(
        @Request() req,
        @Body('title') title: string,
    ) {
        return this.timeService.startTime(req.user.userId, title);
    }
}
