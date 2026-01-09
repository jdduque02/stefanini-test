import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsIn } from 'class-validator';
import { CompanyDto } from './create-company.dto';

export class CompanyPymeDto extends CompanyDto {
  @ApiPropertyOptional({
    example: false,
    description:
      'Indica si la empresa requiere aprobación manual para transferencias',
  })
  @IsOptional()
  @IsBoolean({ message: 'El campo debe ser un valor booleano' })
  company_require_manual_approval?: boolean;

  @ApiPropertyOptional({
    example: 'Micro',
    description: 'Categoría de la PyME',
    enum: ['Micro', 'Pequeña', 'Mediana'],
  })
  @IsOptional()
  @IsString({ message: 'La categoría debe ser una cadena de texto' })
  @IsIn(['Micro', 'Pequeña', 'Mediana'], {
    message: 'La categoría debe ser Micro, Pequeña o Mediana',
  })
  company_category_pyme?: string;
}
