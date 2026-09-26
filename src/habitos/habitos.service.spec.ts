import { Test, TestingModule } from '@nestjs/testing';
import { HabitosService } from './habitos.service';
import { PrismaService } from '../prisma/prisma.service';
import { Estado, Frecuencia } from '@prisma/client';

describe('HabitosService', () => {
  let service: HabitosService;
  let prisma: { habitos: { create: jest.Mock } };

  beforeEach(async () => {
    prisma = {
      habitos: {
        create: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [HabitosService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<HabitosService>(HabitosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save estado and frecuencia when creating a habit', async () => {
    prisma.habitos.create.mockResolvedValue({ id: 1 });

    await service.crear(
      {
        nombre: 'Leer 10 páginas',
        descripcion: 'Antes de dormir',
        estado: Estado.ACTIVO,
        frecuencia: Frecuencia.SEMANAL,
      },
      7,
    );

    expect(prisma.habitos.create).toHaveBeenCalledWith({
      data: {
        nombre: 'Leer 10 páginas',
        descripcion: 'Antes de dormir',
        estado: Estado.ACTIVO,
        frecuencia: Frecuencia.SEMANAL,
        actorId: 7,
      },
    });
  });
});
