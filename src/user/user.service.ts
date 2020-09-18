import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import config from '../../config/config.json';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}
    
    async getUserById(id: number): Promise<User> {
        return await this.userRepository.findOne(id);
    }

    async getUserByEmail(email: string) {
        return await this.userRepository.findOne({ email });
    }

    async createUser(user: User): Promise<any> {
        return await this.userRepository.insert({
            ...user,
            password: bcrypt.hashSync(user.password, config.password.hashRounds),
        });
    }
}