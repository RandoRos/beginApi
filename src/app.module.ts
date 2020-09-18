import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TimeModule } from './time/time.module';
import entities from './entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.db',
      synchronize: true,
      logging: true,
      entities,
    }),
    UserModule,
    TimeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
