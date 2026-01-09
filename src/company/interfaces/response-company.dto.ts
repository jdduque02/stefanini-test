import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ResponseTransferDto } from '../../transfer/interfaces/response-transfer.dto';

export class ResponseCompanyDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID único de la empresa',
  })
  id: string;

  @ApiProperty({
    example: 'Empresa XYZ',
    description: 'Nombre de la empresa',
  })
  company_name: string;

  @ApiProperty({
    example: '12345678901234',
    description:
      'CUIT (Código Único de Identificación Tributaria) de la empresa',
  })
  company_cuit: string;

  @ApiProperty({
    example: 'PyME',
    description: 'Tipo de empresa',
    enum: ['PyME', 'Corporativa'],
  })
  company_type: string;

  @ApiProperty({
    example: 'Av. Siempre Viva 123, Buenos Aires',
    description: 'Dirección de la empresa',
  })
  company_address: string;

  @ApiPropertyOptional({
    example: 50,
    description: 'Número de empleados de la empresa',
  })
  company_number_employees?: number;

  @ApiPropertyOptional({
    example: new Date(),
    description: 'Fecha de creación del registro',
  })
  company_create_at?: Date;

  @ApiPropertyOptional({
    example: new Date(),
    description: 'Fecha de última actualización del registro',
  })
  company_update_at?: Date;

  @ApiPropertyOptional({
    example: true,
    description: 'Estado activo/inactivo de la empresa',
  })
  company_isactive?: boolean;

  @ApiPropertyOptional({
    description: 'Transferencias realizadas por la empresa en el último mes',
    type: [ResponseTransferDto],
    isArray: true,
  })
  transfers?: ResponseTransferDto[];
}
