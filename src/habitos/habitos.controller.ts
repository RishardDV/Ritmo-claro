import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ActorActual } from '../auth/usuario-actual.decorator';
import { HabitosService } from './habitos.service';
import { CrearHabitoDto } from './dto/crear-habito.dto';
import { ActualizarHabitoDto } from './dto/actualizar-habito.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('habitos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('habitos')
export class HabitosController {
  constructor(private readonly habitosService: HabitosService) {}

  @Post()
  crear(@Body() dto: CrearHabitoDto, @ActorActual() actor: { id: number }) {
    return this.habitosService.crear(dto, actor.id);
  }

  @Get('')
  obtenerMios(@ActorActual() actor: { id: number }) {
    return this.habitosService.obtenerMios(actor.id);
  }

  @Get('admin/todas')
  @UseGuards(RolesGuard)
  @Roles([Role.ADMIN])
  obtenerTodasAdmin() {
    return this.habitosService.obtenerTodosAdmin();
  }

  @Get(':id')
  obtenerUno(
    @Param('id', ParseIntPipe) id: number,
    @ActorActual() actor: { id: number },
  ) {
    return this.habitosService.obtenerUno(id, actor.id);
  }

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarHabitoDto,
    @ActorActual() actor: { id: number },
  ) {
    return this.habitosService.actualizar(id, dto, actor.id);
  }

  @Delete(':id')
  eliminar(
    @Param('id', ParseIntPipe) id: number,
    @ActorActual() actor: { id: number },
  ) {
    return this.habitosService.eliminar(id, actor.id);
  }
}
