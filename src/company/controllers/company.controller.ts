import { Controller, Get, Post, Body, Version, Query } from '@nestjs/common';
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
import { ResponseTransferDto } from '../../transfer/interfaces/response-transfer.dto';
import { CompanyFilterDto } from '../interfaces/company-filter.dto';
import { PaginatedResponseDto } from '../interfaces/paginated-response.dto';

@ApiTags('Company')
@ApiExtraModels(
  CompanyPymeDto,
  CompanyCorporateDto,
  ResponseCompanyDto,
  ResponseTransferDto,
  PaginatedResponseDto,
)
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
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
    schema: {
      example: {
        message: 'El CUIT es inválido',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor',
    schema: {
      example: {
        message: 'Unexpected error',
        error: 'Internal Server Error',
        statusCode: 500,
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Conflicto al crear la empresa',
    schema: {
      example: {
        message: 'Ya existe una empresa con ese CUIT',
        error: 'Conflict',
        statusCode: 409,
      },
    },
  })
  create(@Body() CompanyDto: CompanyPymeDto | CompanyCorporateDto) {
    return this.companyService.create(CompanyDto);
  }

  @Version('1')
  @Get()
  @ApiOperation({
    summary:
      'Obtener empresas con transferencias del último mes (filtrado, ordenado y paginado)',
    description:
      'Retorna empresas que realizaron transferencias en el último mes. Soporta filtros por nombre, CUIT y tipo, ordenamiento por fechas, y paginación.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista paginada y filtrada de empresas',
    schema: {
      allOf: [
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(ResponseCompanyDto) },
            },
            total: { type: 'number', example: 50 },
            page: { type: 'number', example: 1 },
            limit: { type: 'number', example: 10 },
            totalPages: { type: 'number', example: 5 },
          },
        },
      ],
    },
  })
  findAll(@Query() filterDto: CompanyFilterDto) {
    return this.companyService.findAll(filterDto);
  }
}
