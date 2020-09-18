import { Controller, Post, Patch, Get, Param, Body } from '@nestjs/common';
import { TimeService } from './time.service';

@Controller('time')
export class timeController {
    constructor(private readonly timeService: TimeService) {}

    @Get(':id')
    getAll(@Param('id') id: number) {
        return this.timeService.getAllUserTimes(id);
    }

    @Get(':id/:timeId')
    getTime(
        @Param('id') id: number,
        @Param('timeId') timeId: number,
    ) {
        return this.timeService.getTimeForUser(id, timeId);
    }

    @Post()
    createTime(
        @Body('title') title: string,
        @Body('user') userId: number,
    ) {
        return this.timeService.startTime(userId, title);
    }
}
