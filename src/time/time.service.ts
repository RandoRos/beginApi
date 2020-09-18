import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Time } from '../entities/time.entity';

@Injectable()
export class TimeService {
    constructor(
        @InjectRepository(Time)
        private readonly timeRepository: Repository<Time>,
    ) {}

    async getAllUserTimes(userId: number) {
        return await this.timeRepository.find({ userId });
    }

    async getTimeForUser(id, userId) {
        return await this.timeRepository.find({ id, userId });
    }

    async startTime(userId: number, title: string) {
        return await this.timeRepository.insert({
            userId,
            title,
            startTime: new Date(),
        });
    }
}