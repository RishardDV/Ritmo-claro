import { Module } from '@nestjs/common';
import { HabitosController } from './habitos.controller';

@Module({
  controllers: [HabitosController]
})
export class HabitosModule {}
