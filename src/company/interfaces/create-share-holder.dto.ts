import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, Matches, Min, Max, IsOptional, MinLength, MaxLength } from 'class-validator';

export class ShareholderDto {
  @ApiProperty({
    example: 'María García',
    description: 'Nombre completo del accionista',
    minLength: 5,
    maxLength: 155,
    pattern: '^[a-zA-Z ]+$',
  })
  @IsString({ message: 'El nombre del accionista debe ser una cadena de texto' })
  @MinLength(5, { message: 'El nombre del accionista debe tener al menos 5 caracteres' })
  @MaxLength(155, { message: 'El nombre del accionista no puede tener más de 155 caracteres' })
  @Matches(/^[a-zA-Z ]+$/, { message: 'El nombre del accionista solo puede contener letras y espacios' })
  share_holder_name: string;

  @ApiProperty({
    example: '20123456789',
    description: 'CUIT/CUIL del accionista ',
    pattern: String.raw`^\d{11}$`,
    minLength: 11,
    maxLength: 11,
  })
  @IsString({ message: 'El CUIT/CUIL debe ser una cadena de texto' })
  @MinLength(11, { message: 'El CUIT/CUIL debe tener 11 dígitos' })
  @MaxLength(11, { message: 'El CUIT/CUIL debe tener 11 dígitos' })
  @Matches(/^\d{11}$/, { message: 'El CUIT/CUIL debe tener 11 dígitos' })
  share_holder_cuit: string;

  @ApiProperty({
    example: 25.5,
    description: 'Porcentaje de participación accionaria (0-100)',
    minimum: 0,
    maximum: 100,
  })
  @IsNumber({}, { message: 'El porcentaje de participación debe ser un número' })
  @Min(0, { message: 'El porcentaje de participación no puede ser menor que 0' })
  @Max(100, { message: 'El porcentaje de participación no puede ser mayor que 100' })
  share_holder_participation: number;

  @ApiPropertyOptional({
    example: new Date(),
    description: 'Fecha de creación del accionista',
  })
  @IsOptional()
  share_holder_create_at?: Date = new Date();
  
  @ApiPropertyOptional({
    example: new Date(),
    description: 'Fecha de actualización del accionista',
  })
  @IsOptional()
  share_holder_update_at?: Date = new Date();
  
  @ApiPropertyOptional({
    example: true,
    description: 'Estado del accionista',
  })
  share_holder_is_active?: boolean = true;
}
