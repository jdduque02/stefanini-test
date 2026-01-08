import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from '../domain/interfaces/create-company.dto';

@Injectable()
export class CompanyService {
  create(createCompanyDto: CreateCompanyDto) {
    return 'This action adds a new company';
  }

  findAll() {
    return `This action returns all company`;
  }
}
