import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsIn, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CompanyFilterDto {
  @ApiPropertyOptional({
    description: 'Número de página (inicia en 1)',
    minimum: 1,
    default: 1,
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'La página debe ser un número entero' })
  @Min(1, { message: 'La página debe ser mayor o igual a 1' })
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Cantidad de elementos por página',
    minimum: 1,
    maximum: 100,
    default: 10,
    example: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'El límite debe ser un número entero' })
  @Min(1, { message: 'El límite debe ser mayor o igual a 1' })
  @Max(100, { message: 'El límite no puede ser mayor a 100' })
  limit?: number = 10;

  @ApiPropertyOptional({
    description:
      'Filtrar por nombre de empresa (búsqueda parcial, case-insensitive)',
    example: 'Empresa',
  })
  @IsOptional()
  @IsString()
  company_name?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por CUIT exacto',
    example: '20123456789',
  })
  @IsOptional()
  @IsString()
  company_cuit?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por tipo de empresa',
    enum: ['PyME', 'Corporativa'],
    example: 'PyME',
  })
  @IsOptional()
  @IsString()
  @IsIn(['PyME', 'Corporativa'], {
    message: 'El tipo de empresa debe ser PyME o Corporativa',
  })
  company_type?: string;

  @ApiPropertyOptional({
    description: 'Campo por el cual ordenar',
    enum: ['company_create_at', 'company_update_at'],
    default: 'company_create_at',
    example: 'company_create_at',
  })
  @IsOptional()
  @IsString()
  @IsIn(['company_create_at', 'company_update_at'], {
    message: 'Solo se puede ordenar por company_create_at o company_update_at',
  })
  sortBy?: string = 'company_create_at';

  @ApiPropertyOptional({
    description: 'Orden de clasificación',
    enum: ['ASC', 'DESC'],
    default: 'DESC',
    example: 'DESC',
  })
  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'], {
    message: 'El orden debe ser ASC o DESC',
  })
  order?: 'ASC' | 'DESC' = 'DESC';
}
