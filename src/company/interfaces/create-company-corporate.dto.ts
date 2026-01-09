import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsDateString,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CompanyDto } from './create-company.dto';
import { ProxyDto } from './create-proxy.dto';
import { ShareholderDto } from './create-share-holder.dto';

export class CompanyCorporateDto extends CompanyDto {
  @ApiPropertyOptional({
    example: new Date(),
    description: 'Fecha de resolución de la empresa corporativa',
  })
  @IsOptional()
  @IsDateString({}, { message: 'Debe ser una fecha válida' })
  company_resolution_time?: Date;

  @ApiPropertyOptional({
    description: 'Lista de apoderados de la empresa',
    type: [ProxyDto],
  })
  @IsOptional()
  @IsArray({ message: 'Los apoderados deben ser un arreglo' })
  @ValidateNested({ each: true })
  @Type(() => ProxyDto)
  company_proxies?: ProxyDto[];

  @ApiPropertyOptional({
    description: 'Lista de accionistas de la empresa',
    type: [ShareholderDto],
  })
  @IsOptional()
  @IsArray({ message: 'Los accionistas deben ser un arreglo' })
  @ValidateNested({ each: true })
  @Type(() => ShareholderDto)
  company_shareholders?: ShareholderDto[];
}
