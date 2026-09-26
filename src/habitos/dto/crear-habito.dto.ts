import { IsString, IsNotEmpty, IsOptional, MinLength, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Frecuencia, Estado } from '@prisma/client';

export class CrearHabitoDto {
  @ApiProperty({ example: 'Leer 10 páginas' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  nombre!: string;

  @ApiPropertyOptional({
    example: Frecuencia.SEMANAL,
    enum: Frecuencia,
    description: 'Frecuencia del hábito',
  })
  @IsOptional()
  @IsEnum(Frecuencia)
  frecuencia?: Frecuencia;

  @ApiPropertyOptional({
    example: Estado.ACTIVO,
    enum: Estado,
    description: 'Estado del hábito',
  })
  @IsOptional()
  @IsEnum(Estado)
  estado?: Estado;

  @ApiPropertyOptional({
    example: 'Leer un libro de superación personal antes de dormir',
  })
  @IsString()
  @IsOptional()
  @MinLength(2, { message: 'La descripción debe tener al menos 2 caracteres' })
  descripcion?: string;
}
