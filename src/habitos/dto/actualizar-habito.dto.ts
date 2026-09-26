import { IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Estado, Frecuencia } from '@prisma/client';

export class ActualizarHabitoDto {
  @ApiPropertyOptional({ example: 'Leer 20 páginas' })
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  nombre?: string;

  @ApiPropertyOptional({ example: 'Tomar café' })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional({ example: Estado.ACTIVO, enum: Estado })
  @IsOptional()
  @IsEnum(Estado)
  estado?: Estado;

  @ApiPropertyOptional({ example: Frecuencia.SEMANAL, enum: Frecuencia })
  @IsOptional()
  @IsEnum(Frecuencia)
  frecuencia?: Frecuencia;
}
