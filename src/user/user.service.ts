import { Injectable, UnauthorizedException, Get } from '@nestjs/common';

export interface User {
    id: number,
    name: string,
    password: string,
    token: string,
};

@Injectable()
export class UserService {
    protected userDB: User[] = [];

    getUser(token: string): User {
        return this.userDB.find((user) => user.token === token);
    }

    createUser(name: string, password: string): string {
        const id = Math.floor(Math.random() * 999);
        const token = this.generateToken(name, password)
        this.userDB.push({
            id,
            name,
            password,
            token,
        });
        return token;
    }

    authenticate(name: string, password: string): string {
        const token = this.generateToken(name, password);
        const user = this.userDB.find((user) => user.token === token);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user.token;
    }

    private generateToken(name: string, password: string): string {
        return Buffer.from(name + password).toString('base64');
    }
}