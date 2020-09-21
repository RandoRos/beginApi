import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'typeorm';
import { Repository } from 'typeorm';

import { Time } from '../entities/time.entity';

@Injectable()
export class TimeService {
    constructor(
        @InjectRepository(Time)
        private readonly timeRepository: Repository<Time>,
    ) {}

    async getAllUserTimes(userId: number, title?: string): Promise<Time[]>  {
         // potential SQL Injection
        return await this.timeRepository
            .createQueryBuilder('time')
            .where('time.userId = :id', { id: userId })
            .andWhere('time.title like :title', { title: `%${title || ''}%`})
            .orderBy('time.startTime', 'DESC')
            .getMany();
    }

    async getTimeForUser(id, userId): Promise<Time> {
        return await this.timeRepository.findOne({ id, userId });
    }

    async startTime(userId: number, title: string) {
        return await this.timeRepository.insert({
            userId,
            title,
            startTime: new Date(),
        });
    }

    async endTime(timeId: number) {
        return await this.timeRepository.update(timeId, {
            endTime: new Date(),
        });
    }

    async editTime(userId: number, timeId: number, payload: Time) {
        const userTime = await this.getTimeForUser(timeId, userId);
        if (!userTime) {
            throw new UnauthorizedException();
        }
        const updatedTime = { ...userTime };

        if (payload.title) {
            updatedTime.title = payload.title;
        }
        if (payload.startTime) {
            // Check if start time is after endTime
            updatedTime.startTime = payload.startTime;
        }

        if (payload.endTime) {
            // Check if end time is before startTime 
            updatedTime.endTime = payload.endTime;
        }

        return await this.timeRepository.update(timeId, updatedTime);
    }
}