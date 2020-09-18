import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}
    
    async getUser(id: number): Promise<User> {
        return await this.userRepository.findOne(id);
    }

    async createUser(name: string, password: string): Promise<any> {
        return await this.userRepository.insert({
            name,
            password,
        });
    }

    // authenticate(name: string, password: string): string {
    //     const token = this.generateToken(name, password);
    //     const user = this.userDB.find((user) => user.token === token);
    //     if (!user) {
    //         throw new UnauthorizedException();
    //     }
    //     return user.token;
    // }

    private generateToken(name: string, password: string): string {
        return Buffer.from(name + password).toString('base64');
    }
}