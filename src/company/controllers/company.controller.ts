import { Controller, Get, Post, Body, Version } from '@nestjs/common';
import { CompanyService } from '../services/company.service';
import { CompanyDto } from '../interfaces/create-company.dto';
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @Version('1')
  @Post()
  create(@Body() CompanyDto: CompanyDto) {
    return this.companyService.create(CompanyDto);
  }
  @Version('1')
  @Get()
  findAll() {
    return this.companyService.findAll();
  }
}
