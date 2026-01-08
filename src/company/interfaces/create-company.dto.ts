import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsIn,
  IsOptional,
} from 'class-validator';
export class CompanyDto {
  @ApiProperty({
    example: 'Empresa XYZ',
    description: 'Nombre de la empresa',
    minLength: 3,
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'El nombre de la empresa no puede estar vacío' })
  @IsString({ message: 'El nombre de la empresa debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El nombre de la empresa debe tener al menos 3 caracteres',
  })
  @MaxLength(100, {
    message: 'El nombre de la empresa no puede tener más de 100 caracteres',
  })
  company_name: string;

  @ApiProperty({
    example: '12345678901234',
    description:
      'CUIT (Código Único de Identificación Tributaria) de la empresa ',
    minLength: 11,
    maxLength: 11,
  })
  @IsNotEmpty({ message: 'El CUIT de la empresa no puede estar vacío' })
  @IsString({ message: 'El CUIT de la empresa debe ser una cadena de texto' })
  @MinLength(11, { message: 'El CUIT de la empresa debe tener 11 caracteres' })
  @MaxLength(11, { message: 'El CUIT de la empresa debe tener 11 caracteres' })
  company_cuit: string;

  @ApiProperty({
    example: 'PyME',
    description: 'Tipo de empresa',
    enum: ['PyME', 'Corporativa'],
  })
  @IsNotEmpty({ message: 'El tipo de empresa no puede estar vacío' })
  @IsString({ message: 'El tipo de empresa debe ser una cadena de texto' })
  @IsIn(['PyME', 'Corporativa'])
  company_type: string;

  @ApiProperty({
    example: '12345678901234',
    description: 'Dirección de la empresa',
    minLength: 6,
    maxLength: 255,
  })
  @IsNotEmpty({ message: 'La dirección de la empresa no puede estar vacía' })
  @IsString({
    message: 'La dirección de la empresa debe ser una cadena de texto',
  })
  @MinLength(6, {
    message: 'La dirección de la empresa debe tener al menos 6 caracteres',
  })
  @MaxLength(255, {
    message: 'La dirección de la empresa no puede tener más de 255 caracteres',
  })
  company_address: string;

  @ApiProperty({
    description: 'Datos específicos según el tipo de empresa (opcional)',
    required: false,
    type: Object,
  })
  @IsOptional()
  company_meta?: Record<string, any>;
}
