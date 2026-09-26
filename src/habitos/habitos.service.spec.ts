import { Test, TestingModule } from '@nestjs/testing';
import { HabitosService } from './habitos.service';
import { PrismaService } from '../prisma/prisma.service';

describe('HabitosService', () => {
  let service: HabitosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HabitosService, { provide: PrismaService, useValue: {} }],
    }).compile();

    service = module.get<HabitosService>(HabitosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
