import { PartialType } from '@nestjs/swagger';
import { CompanyDto } from './create-company.dto';

export class CompanyPymeDto extends PartialType(CompanyDto) {}
