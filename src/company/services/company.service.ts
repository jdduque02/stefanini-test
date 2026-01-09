import { Injectable } from '@nestjs/common';
import { CompanyPymeDto } from '../interfaces/create-company-pyme.dto';
import { CompanyCorporateDto } from '../interfaces/create-company-corporate.dto';
import { ResponseCompanyDto } from '../interfaces/response-company.dto';
import { CompanyFilterDto } from '../interfaces/company-filter.dto';
import { PaginatedResponseDto } from '../interfaces/paginated-response.dto';
import { JsonCompanyRepository } from '../repository/company.repository';
import { TransferService } from '../../transfer/services/transfer.service';

@Injectable()
export class CompanyService {
  constructor(
    private readonly companyRepository: JsonCompanyRepository,
    private readonly transferService: TransferService,
  ) {}

  async create(
    companyDto: CompanyPymeDto | CompanyCorporateDto,
  ): Promise<ResponseCompanyDto> {
    return await this.companyRepository.create(companyDto);
  }

  async findAll(
    filterDto?: CompanyFilterDto,
  ): Promise<PaginatedResponseDto<ResponseCompanyDto>> {
    const companies = await this.companyRepository.findAll();
    const transfers = await this.transferService.findAll();

    // Calcular la fecha de hace un mes
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    // Filtrar transferencias del último mes
    const recentTransfers = transfers.filter((transfer) => {
      const transferDate = new Date(transfer.transfer_date);
      return transferDate >= oneMonthAgo;
    });

    // Obtener IDs únicos de empresas con transferencias recientes
    const companyIdsWithTransfers = new Set(
      recentTransfers.map((transfer) => transfer.transfer_company_id),
    );

    // Filtrar empresas que tienen transferencias en el último mes
    let filteredCompanies = companies.filter((company) =>
      companyIdsWithTransfers.has(company.id),
    );

    // Aplicar filtros adicionales
    if (filterDto?.company_name) {
      const searchName = filterDto.company_name.toLowerCase();
      filteredCompanies = filteredCompanies.filter((company) =>
        company.company_name.toLowerCase().includes(searchName),
      );
    }

    if (filterDto?.company_cuit) {
      filteredCompanies = filteredCompanies.filter(
        (company) => company.company_cuit === filterDto.company_cuit,
      );
    }

    if (filterDto?.company_type) {
      filteredCompanies = filteredCompanies.filter(
        (company) => company.company_type === filterDto.company_type,
      );
    }

    // Aplicar ordenamiento
    const sortBy = filterDto?.sortBy || 'company_create_at';
    const order = filterDto?.order || 'desc';

    filteredCompanies.sort((a, b) => {
      const dateA = new Date(a[sortBy]).getTime();
      const dateB = new Date(b[sortBy]).getTime();
      return order === 'ASC' ? dateA - dateB : dateB - dateA;
    });

    // Enriquecer cada empresa con sus transferencias del mes
    const enrichedCompanies = filteredCompanies.map((company) => ({
      ...company,
      transfers: recentTransfers.filter(
        (transfer) => transfer.transfer_company_id === company.id,
      ),
    }));

    // Aplicar paginación
    const page = filterDto?.page || 1;
    const limit = filterDto?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedData = enrichedCompanies.slice(startIndex, endIndex);
    const total = enrichedCompanies.length;
    const totalPages = Math.ceil(total / limit);

    return {
      data: paginatedData,
      total,
      page,
      limit,
      totalPages,
    };
  }
}
