import { Injectable } from '@nestjs/common';
import { CompanyPymeDto } from '../interfaces/create-company-pyme.dto';
import { CompanyCorporateDto } from '../interfaces/create-company-corporate.dto';
import { ResponseCompanyDto } from '../interfaces/response-company.dto';
import { JsonCompanyRepository } from '../repository/company.repository';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: JsonCompanyRepository) {}

  async create(
    companyDto: CompanyPymeDto | CompanyCorporateDto,
  ): Promise<ResponseCompanyDto> {
    return await this.companyRepository.create(companyDto);
  }

  async findAll(): Promise<ResponseCompanyDto[]> {
    return await this.companyRepository.findAll();
  }
}

