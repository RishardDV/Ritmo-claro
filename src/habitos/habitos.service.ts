import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CrearHabitoDto } from './dto/crear-habito.dto';
import { ActualizarHabitoDto } from './dto/actualizar-habito.dto';
import { Role } from '@prisma/client';

@Injectable()
export class HabitosService {
  constructor(private readonly prisma: PrismaService) {}

  crear(dto: CrearHabitoDto, actorId: number) {
    return this.prisma.habitos.create({
      data: {
        nombre: dto.nombre,
        descripcion: dto.descripcion,
        actorId,
      },
    });
  }

  obtenerMios(actorId: number) {
    return this.prisma.habitos.findMany({
      where: { actorId },
      orderBy: { id: 'asc' },
    });
  }

  obtenerTodosAdmin() {
    return this.prisma.habitos.findMany({
      include: {
        actor: { select: { id: true, nombre: true, email: true } },
      },
      orderBy: { id: 'asc' },
    });
  }

  async obtenerUno(id: number, actorId: number) {
    const habito = await this.prisma.habitos.findUnique({
      where: { id },
    });

    if (!habito) {
      throw new NotFoundException('El hábito no existe');
    }

    if (habito.actorId !== actorId) {
      throw new ForbiddenException('Este hábito no te pertenece');
    }

    return habito;
  }

  async actualizar(id: number, dto: ActualizarHabitoDto, actorId: number) {
    await this.obtenerUno(id, actorId);
    return this.prisma.habitos.update({
      where: { id },
      data: dto,
    });
  }

  async eliminar(id: number, actorId: number) {
    await this.obtenerUno(id, actorId);
    return this.prisma.habitos.delete({ where: { id } });
  }
}
