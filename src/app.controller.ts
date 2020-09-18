import { Controller, Get, BadRequestException, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('auth')
  authenticate(
      @Query('email') name: string,
      @Query('pw') password: string,
  ) {
      if (!name || !password) {
          throw new BadRequestException();
      }
      return this.appService.authenticate(name, password);
  }
}
