import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

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
}
