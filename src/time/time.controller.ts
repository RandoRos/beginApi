import { Controller, Post, Patch, Get, Param, Body } from '@nestjs/common';
import { TimeService } from './time.service';

@Controller('time')
export class timeController {
    constructor(private readonly timeService: TimeService) {}

    @Get()
    getAll() {
        return this.timeService.getAll();
    }

    @Get(':id')
    getTime(@Param('id') id: number) {
        return this.timeService.getTime(id);
    }

    @Post()
    createTime(
        @Body('title') title: string,
        @Body('user') userId: number,
    ) {
        return this.timeService.startTime(userId, title);
    }
}
