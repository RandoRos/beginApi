import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { TimeModule } from './time/time.module';
import entities from './entities';
import { AuthModule } from './auth/auth.module';

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
    TimeModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
