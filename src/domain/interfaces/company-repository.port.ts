import { Company } from '../entities/company.entity';
import { CreateCompanyDto } from './create-company.dto';

export interface CompanyRepositoryPort {

  findAll(): Promise<Company[]>;
  create(createCompanyDto: CreateCompanyDto): Promise<Company>;

}