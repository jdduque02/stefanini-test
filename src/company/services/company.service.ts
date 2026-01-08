import { Injectable } from '@nestjs/common';
import { CompanyDto } from '../interfaces/create-company.dto';

@Injectable()
export class CompanyService {
  create(CompanyDto: CompanyDto) {
    return 'This action adds a new company';
  }

  findAll() {
    return `This action returns all company`;
  }
}
