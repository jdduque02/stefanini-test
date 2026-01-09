import {
  Injectable,
  Logger,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import { v4 as uuidv4 } from 'uuid';
import { Company } from '../entities/company.entity';
import { CompanyPyme } from '../entities/company-pyme.entity';
import { CompanyCorporate } from '../entities/company-corporate.entity';
import { CompanyDto } from '../interfaces/create-company.dto';
import { CompanyPymeDto } from '../interfaces/create-company-pyme.dto';
import { CompanyCorporateDto } from '../interfaces/create-company-corporate.dto';

@Injectable()
export class JsonCompanyRepository {
  private readonly filePath: string;

  constructor() {
    this.filePath = join(
      __dirname,
      '..',
      '..',
      '..',
      'src',
      'db',
      'company.json',
    );
  }

  private async readFile(): Promise<Company[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      if (!data || data?.trim() === '') {
        return [];
      }
      return JSON.parse(data);
    } catch (error) {
      Logger.error('Error al leer el archivo JSON:', error.message);
      throw error;
    }
  }

  private async writeFile(companies: Company[]): Promise<void> {
    await fs.writeFile(
      this.filePath,
      JSON.stringify(companies, null, 2),
      'utf-8',
    );
  }

  async findAll(): Promise<Company[]> {
    return await this.readFile();
  }

  async create(
    companyDto: CompanyDto | CompanyPymeDto | CompanyCorporateDto,
  ): Promise<Company> {
    const companies = await this.readFile();

    const existingCompany = companies.find(
      ({ company_cuit }) => company_cuit === companyDto.company_cuit,
    );
    if (existingCompany) {
      throw new ConflictException(
        `Ya existe una empresa con el CUIT ${companyDto.company_cuit}`,
      );
    }

    try {
      let newCompany: Company | CompanyPyme | CompanyCorporate;

      // Identificar el tipo de empresa y crear la instancia correspondiente
      if (companyDto.company_type === 'PyME') {
        const pymeDto = companyDto as CompanyPymeDto;
        newCompany = {
          id: uuidv4(),
          ...pymeDto,
          company_require_manual_approval:
            pymeDto.company_require_manual_approval ?? false,
          company_category_pyme: pymeDto.company_category_pyme ?? 'Pequeña',
        } as CompanyPyme;
      } else if (companyDto.company_type === 'Corporativa') {
        const corporateDto = companyDto as CompanyCorporateDto;
        newCompany = {
          id: uuidv4(),
          ...corporateDto,
          company_resolution_time:
            corporateDto.company_resolution_time ?? new Date(),
          company_proxies: corporateDto.company_proxies ?? [],
          company_shareholders: corporateDto.company_shareholders ?? [],
        } as CompanyCorporate;
      } else {
        // Empresa genérica si el tipo no coincide
        newCompany = {
          id: uuidv4(),
          ...companyDto,
        } as Company;
      }

      companies.push(newCompany);
      await this.writeFile(companies);

      return newCompany;
    } catch (error) {
      Logger.error('Error al crear la empresa:', error.message);
      throw new InternalServerErrorException('Error al crear la empresa');
    }
  }
}
