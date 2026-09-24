import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { HabitosService } from './habitos/habitos.service';
import { HabitosModule } from './habitos/habitos.module';

@Module({
  imports: [PrismaModule, AuthModule, HabitosModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, AuthService, HabitosService],
})
export class AppModule {}
