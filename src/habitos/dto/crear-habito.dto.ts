import { IsString, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CrearHabitoDto {
  @ApiProperty({ example: 'Leer 10 páginas' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  nombre!: string;

  @ApiPropertyOptional({
    example: 'Leer un libro de superación personal antes de dormir',
  })
  @IsString()
  @IsOptional()
  @MinLength(2, { message: 'La descripción debe tener al menos 2 caracteres' })
  descripcion?: string;
}
