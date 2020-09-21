import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import moment from 'moment';

import { Time } from '../entities/time.entity';

@Injectable()
export class TimeService {
    constructor(
        @InjectRepository(Time)
        private readonly timeRepository: Repository<Time>,
    ) {}

    async getAllUserTimes(userId: number, title?: string): Promise<any>  {
         // potential SQL Injection
        const rows = await this.timeRepository
            .createQueryBuilder('time')
            .where('time.userId = :id', { id: userId })
            .andWhere('time.title like :title', { title: `%${title || ''}%`})
            .orderBy('time.startTime', 'DESC')
            .getMany();
        
        return { 
            times: rows, 
            duration: this.getDuration(rows)
        };
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

    async endTime(userId: number, timeId: number) {
        const userTime = await this.getTimeForUser(timeId, userId);
        if (!userTime) {
            throw new UnauthorizedException();
        }
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
            if (moment(payload.startTime).isAfter(updatedTime.endTime)) {
                throw new ForbiddenException('Start time has to be before end time');
            }
            updatedTime.startTime = payload.startTime;
        }

        if (payload.endTime) {
            if (moment(payload.endTime).isBefore(updatedTime.startTime)) {
                throw new ForbiddenException('End time has to be after start time');
            }
            updatedTime.endTime = payload.endTime;
        }

        return await this.timeRepository.update(timeId, updatedTime);
    }

    private getDuration(times: Time[]): string {
        const ms = times.reduce((duration, time) => {
            if (time.endTime) {
                duration += moment(time.endTime).diff(moment(time.startTime));
            }
            return duration;
        }, 0);
        
        const duration = moment.duration(ms);
        return Math.floor(duration.asHours()) + moment(ms).format(':mm:ss');
    }
}