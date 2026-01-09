import {
  Injectable,
  Logger,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import { v4 as uuidv4 } from 'uuid';
import { Transfer } from '../entities/transfer.entity';
import { CreateTransferDto } from '../interfaces/create-transfer.dto';
import { Company } from '../../company/entities/company.entity';

@Injectable()
export class JsonTransferRepository {
  private readonly filePath: string;
  private readonly companyFilePath: string;

  constructor() {
    this.filePath = join(
      __dirname,
      '..',
      '..',
      '..',
      'src',
      'db',
      'transfers.json',
    );
    this.companyFilePath = join(
      __dirname,
      '..',
      '..',
      '..',
      'src',
      'db',
      'company.json',
    );
  }

  private async readFile(): Promise<Transfer[]> {
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

  private async writeFile(transfers: Transfer[]): Promise<void> {
    await fs.writeFile(
      this.filePath,
      JSON.stringify(transfers, null, 2),
      'utf-8',
    );
  }

  async findAll(): Promise<Transfer[]> {
    return await this.readFile();
  }

  private async readCompanyFile(): Promise<Company[]> {
    try {
      const data = await fs.readFile(this.companyFilePath, 'utf-8');
      if (!data || data?.trim() === '') {
        return [];
      }
      return JSON.parse(data);
    } catch (error) {
      Logger.error('Error al leer el archivo de empresas:', error.message);
      return [];
    }
  }

  async create(createTransferDto: CreateTransferDto): Promise<Transfer> {
    // Validar que la empresa exista
    const companies = await this.readCompanyFile();
    const companyExists = companies.some(
      (company) => company.id === createTransferDto.transfer_company_id,
    );

    if (!companyExists) {
      throw new NotFoundException(
        `No existe una empresa con el ID ${createTransferDto.transfer_company_id}`,
      );
    }

    try {
      const transfers = await this.readFile();

      const newTransfer: Transfer = {
        id: uuidv4(),
        ...createTransferDto,
        transfer_date: createTransferDto.transfer_date || new Date(),
        transfer_status: createTransferDto.transfer_status || 'Pendiente',
        transfer_create_at: new Date(),
        transfer_update_at: new Date(),
        transfer_is_active: true,
      } as Transfer;

      transfers.push(newTransfer);
      await this.writeFile(transfers);

      return newTransfer;
    } catch (error) {
      Logger.error('Error al crear la transferencia:', error.message);
      throw new InternalServerErrorException('Error al crear la transferencia');
    }
  }
}
