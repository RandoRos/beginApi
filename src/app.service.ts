import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserService } from './user/user.service';

@Injectable()
export class AppService {
  constructor(private readonly userService: UserService) {}
  
  async authenticate(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    
    if (!user) {
        throw new UnauthorizedException();
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new UnauthorizedException();
    }
    return `Welcome ${user.firstName}`;
  }
}
