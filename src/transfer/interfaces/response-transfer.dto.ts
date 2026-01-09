import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ResponseTransferDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID único de la transferencia',
  })
  id: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID de la empresa asociada a la transferencia',
  })
  transfer_company_id: string;

  @ApiProperty({
    example: 50000.5,
    description: 'Monto de la transferencia',
  })
  transfer_amount: number;

  @ApiProperty({
    example: new Date(),
    description: 'Fecha de la transferencia',
  })
  transfer_date: Date;

  @ApiProperty({
    example: 'Pendiente',
    description: 'Estado de la transferencia',
    enum: ['Pendiente', 'Aprobada', 'Rechazada', 'Procesada'],
  })
  transfer_status: string;

  @ApiProperty({
    example: 'Débito',
    description: 'Tipo de transferencia',
    enum: ['Débito', 'Crédito'],
  })
  transfer_type: string;

  @ApiPropertyOptional({
    example: 'Pago a proveedor XYZ',
    description: 'Descripción de la transferencia',
  })
  transfer_description?: string;

  @ApiPropertyOptional({
    example: new Date(),
    description: 'Fecha de creación del registro',
  })
  transfer_create_at?: Date;

  @ApiPropertyOptional({
    example: new Date(),
    description: 'Fecha de última actualización del registro',
  })
  transfer_update_at?: Date;

  @ApiPropertyOptional({
    example: true,
    description: 'Estado activo/inactivo de la transferencia',
  })
  transfer_is_active?: boolean;
}
