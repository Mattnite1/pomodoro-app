import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from './task/task.module';
import { TimerModule } from './timer/timer.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}),UserModule, AuthModule, PrismaModule, TaskModule, TimerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
