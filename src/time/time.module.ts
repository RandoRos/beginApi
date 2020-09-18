import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { timeController } from './time.controller';
import { TimeService } from './time.service';
import { Time } from '../entities/time.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Time]),
    ],
    providers: [TimeService],
    controllers: [timeController],
})
export class TimeModule {}