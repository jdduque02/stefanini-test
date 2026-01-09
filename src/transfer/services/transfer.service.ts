import { Injectable } from '@nestjs/common';
import { CreateTransferDto } from '../interfaces/create-transfer.dto';
import { ResponseTransferDto } from '../interfaces/response-transfer.dto';
import { JsonTransferRepository } from '../repository/transfer.repository';

@Injectable()
export class TransferService {
  constructor(private readonly transferRepository: JsonTransferRepository) {}

  async create(
    createTransferDto: CreateTransferDto,
  ): Promise<ResponseTransferDto> {
    return await this.transferRepository.create(createTransferDto);
  }

  async findAll(): Promise<ResponseTransferDto[]> {
    return await this.transferRepository.findAll();
  }
}
