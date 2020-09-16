import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TimeModule } from './time/time.module';

@Module({
  imports: [UserModule, TimeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
