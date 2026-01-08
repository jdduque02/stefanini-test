import { PartialType } from '@nestjs/swagger';
import { CompanyDto } from './create-company.dto';

export class CompanyCorporateDto extends PartialType(CompanyDto) {}
