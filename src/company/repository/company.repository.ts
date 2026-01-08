import { Injectable, Logger } from '@nestjs/common';
import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import { v4 as uuidv4 } from 'uuid';
import { Company } from '../entities/company.entity';
import { CompanyDto } from '../interfaces/create-company.dto';

@Injectable()
export class JsonCompanyRepository {
  private readonly filePath: string;

  constructor() {
    this.filePath = join(__dirname, '..', 'db', 'company.json');
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

  async create(companyDto: CompanyDto): Promise<Company> {
    try {
      const companies = await this.readFile();

      const existingCompany = companies.find(
        ({ company_cuit }) => company_cuit === companyDto.company_cuit,
      );
      if (existingCompany) {
        throw new Error(
          `Ya existe una empresa con el CUIT ${companyDto.company_cuit}`,
        );
      }
      const newCompany: Company = {
        id: uuidv4(),
        ...companyDto,
      };

      companies.push(newCompany);
      await this.writeFile(companies);

      return newCompany;
    } catch (error) {
      Logger.error('Error al crear la empresa:', error.message);
      throw new Error('Error al crear la empresa');
    }
  }
}
