import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class ProxyDto {
  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Nombre completo del apoderado',
    minLength: 5,
    maxLength: 155,
    pattern: '^[a-zA-Z ]+$',
  })
  @IsString({ message: 'El nombre del apoderado debe ser una cadena de texto' })
  @MinLength(5, { message: 'El nombre debe tener al menos 5 caracteres' })
  @MaxLength(155, { message: 'El nombre no puede exceder los 155 caracteres' })
  @Matches(/^[a-zA-Z ]+$/, {
    message: 'El nombre solo puede contener letras y espacios',
  })
  proxy_name: string;

  @ApiProperty({
    example: '12345678',
    description: 'DNI del apoderado (8 dígitos)',
    minLength: 8,
    maxLength: 8,
    pattern: String.raw`^\d{8}$`,
  })
  @IsString()
  @MinLength(8, { message: 'El DNI debe tener 8 dígitos' })
  @MaxLength(8, { message: 'El DNI debe tener 8 dígitos' })
  @Matches(/^\d{8}$/, { message: 'El DNI debe tener 8 dígitos' })
  proxy_dni: string;

  @ApiProperty({
    example: 'Gerente General',
    description: 'Cargo del apoderado en la empresa',
    minLength: 3,
    maxLength: 100,
  })
  @IsString()
  @MinLength(3, { message: 'El cargo debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'El cargo no puede exceder los 100 caracteres' })
  @IsString()
  proxy_position: string;

  @ApiProperty({
    example: 'juan.perez@example.com',
    description: 'Correo electrónico del apoderado',
    pattern: String.raw`^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$`,
    minLength: 5,
    maxLength: 255,
  })
  @MinLength(5, { message: 'El correo electrónico debe tener al menos 5 caracteres' })
  @MaxLength(255, { message: 'El correo electrónico no puede exceder los 255 caracteres'})
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  proxy_mail?: string;
  
  @ApiPropertyOptional({
      example: new Date(),
      description: 'Fecha de creación del apoderado',
  })
  @IsOptional()
  proxy_create_at?: Date = new Date();

  @ApiPropertyOptional({
      example: new Date(),
      description: 'Fecha de actualización del apoderado',
  })
  @IsOptional()
  proxy_update_at?: Date = new Date();

  @ApiPropertyOptional({
      example: true,
      description: 'Estado del apoderado',
  })
  proxy_is_active?: boolean = true;
}
