import { Injectable, NotFoundException } from '@nestjs/common';

export interface Time {
    id: number,
    user: number,
    title: string,
    startTime: Date,
    endTime?: Date,
}

@Injectable()
export class TimeService {
    private timeDB: Time[] = [];

    getAll() {
        return this.timeDB.slice();
    }

    getTime(id: number) {
        const [timeRow] = this.findTimeRow(id);
        return timeRow;
    }

    startTime(userId: number, title: string) {
        const id = Math.floor(Math.random() * 9999);
        this.timeDB.push({
            id,
            user: userId,
            title,
            startTime: new Date(),
        });
        return id;
    }

    endStart(timeId: number) {
        const 
    }

    private findTimeRow(id: number) {
        const timeIndex = this.timeDB.findIndex((time) => time.id == id);
        const timeRow = this.timeDB[timeIndex];
        if (!timeRow) {
            throw new NotFoundException();
        }
        return [timeRow, timeIndex];
    }
}