import {
    Controller,
    Post,
    Get,
    Param,
    Body,
    UseGuards,
    Request,
    Patch,
    Query,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TimeService } from './time.service';

@Controller('time')
export class timeController {
    constructor(private readonly timeService: TimeService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(
        @Request() req,
        @Query('title') title: string,
    ) {
        return this.timeService.getAllUserTimes(req.user.userId, title);
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
    @Patch(':id')
    editTime(
        @Request() req,
        @Param('id') timeId: number,
        @Body() payload: any,
    ) {
        return this.timeService.editTime(req.user.userId, timeId, payload);
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    createTime(
        @Request() req,
        @Body('title') title: string,
    ) {
        return this.timeService.startTime(req.user.userId, title);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('end')
    endTime(
        @Body('id') timeId: number,
    ) {
        return this.timeService.endTime(timeId);
    }
}
