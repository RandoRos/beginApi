import { Injectable } from "@nestjs/common";
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from "src/entities/user.entity";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(username: string, pass: string) {
        const user = await this.userService.getUserByEmail(username);
        const isValid = await bcrypt.compare(pass, user?.password);
        if (!isValid) {
            return null;
        }
        const { password, ...result } = user;
        return result;
    }

    async login(user: User) {
        const payload = { id: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}