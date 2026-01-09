import { Controller, Get, Post, Body, Version } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiExtraModels,
  ApiBody,
  getSchemaPath,
} from '@nestjs/swagger';
import { CompanyService } from '../services/company.service';
import { CompanyPymeDto } from '../interfaces/create-company-pyme.dto';
import { CompanyCorporateDto } from '../interfaces/create-company-corporate.dto';
import { ResponseCompanyDto } from '../interfaces/response-company.dto';

@ApiTags('Company')
@ApiExtraModels(CompanyPymeDto, CompanyCorporateDto, ResponseCompanyDto)
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Version('1')
  @Post()
  @ApiOperation({ summary: 'Crear una nueva empresa (PyME o Corporativa)' })
  @ApiBody({
    description: 'Datos de la empresa a crear. Puede ser PyME o Corporativa',
    schema: {
      oneOf: [
        { $ref: getSchemaPath(CompanyPymeDto) },
        { $ref: getSchemaPath(CompanyCorporateDto) },
      ],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Empresa creada exitosamente',
    type: ResponseCompanyDto,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() CompanyDto: CompanyPymeDto | CompanyCorporateDto) {
    return this.companyService.create(CompanyDto);
  }

  @Version('1')
  @Get()
  @ApiOperation({ summary: 'Obtener todas las empresas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de empresas',
    type: [ResponseCompanyDto],
  })
  findAll() {
    return this.companyService.findAll();
  }
}
