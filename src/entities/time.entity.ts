import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Time {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column('text')
    title: string;

    @Column()
    startTime: Date;

    @Column({ nullable: true })
    endTime: Date;
}
