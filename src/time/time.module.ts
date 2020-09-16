import { Module } from '@nestjs/common';
import { timeController } from './time.controller';
import { TimeService } from './time.service';

@Module({
    providers: [TimeService],
    controllers: [timeController],
})
export class TimeModule {}