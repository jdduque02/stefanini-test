import { Injectable, Logger } from '@nestjs/common';
import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import { v4 as uuidv4 } from 'uuid';
import { Transfer } from '../entities/transfer.entity';
import { CreateTransferDto } from '../interfaces/create-transfer.dto';

@Injectable()
export class JsonTransferRepository {
  private readonly filePath: string;

  constructor() {
    this.filePath = join(__dirname, '..', '..', '..', 'src', 'db', 'transfers.json');
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

  async create(createTransferDto: CreateTransferDto): Promise<Transfer> {
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
      throw new Error('Error al crear la transferencia');
    }
  }
}
