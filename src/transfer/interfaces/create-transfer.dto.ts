import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsIn,
  MinLength,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateTransferDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID de la empresa asociada a la transferencia',
  })
  @IsNotEmpty({ message: 'El ID de la empresa no puede estar vacío' })
  @IsString({ message: 'El ID de la empresa debe ser una cadena de texto' })
  transfer_company_id: string;

  @ApiProperty({
    example: 50000.5,
    description: 'Monto de la transferencia',
    minimum: 0,
  })
  @IsNotEmpty({ message: 'El monto de la transferencia no puede estar vacío' })
  @IsNumber({}, { message: 'El monto debe ser un número' })
  @Min(0, { message: 'El monto debe ser mayor o igual a 0' })
  transfer_amount: number;

  @ApiPropertyOptional({
    example: new Date(),
    description: 'Fecha de la transferencia',
  })
  @IsOptional()
  transfer_date?: Date;

  @ApiPropertyOptional({
    example: 'Pendiente',
    description: 'Estado de la transferencia',
    enum: ['Pendiente', 'Aprobada', 'Rechazada', 'Procesada'],
  })
  @IsOptional()
  @IsString({ message: 'El estado debe ser una cadena de texto' })
  @IsIn(['Pendiente', 'Aprobada', 'Rechazada', 'Procesada'], {
    message: 'El estado debe ser Pendiente, Aprobada, Rechazada o Procesada',
  })
  transfer_status?: string;

  @ApiProperty({
    example: 'Débito',
    description: 'Tipo de transferencia',
    enum: ['Débito', 'Crédito'],
  })
  @IsNotEmpty({ message: 'El tipo de transferencia no puede estar vacío' })
  @IsString({
    message: 'El tipo de transferencia debe ser una cadena de texto',
  })
  @IsIn(['Débito', 'Crédito'], {
    message: 'El tipo de transferencia debe ser Débito o Crédito',
  })
  transfer_type: string;

  @ApiPropertyOptional({
    example: 'Pago a proveedor XYZ',
    description: 'Descripción de la transferencia',
    minLength: 5,
    maxLength: 255,
  })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @MinLength(5, {
    message: 'La descripción debe tener al menos 5 caracteres',
  })
  @MaxLength(255, {
    message: 'La descripción no puede tener más de 255 caracteres',
  })
  transfer_description?: string;
}
