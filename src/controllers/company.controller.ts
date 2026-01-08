import { Controller, Get, Post, Body, Version } from '@nestjs/common';
import { CompanyService } from '../services/company.service';
import { CreateCompanyDto } from '../domain/interfaces/create-company.dto';
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @Version('1')
  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }
  @Version('1')
  @Get()
  findAll() {
    return this.companyService.findAll();
  }
}
