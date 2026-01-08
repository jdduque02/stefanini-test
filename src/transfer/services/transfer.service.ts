import { Injectable } from '@nestjs/common';
import { CreateTransferDto } from '../interfaces/create-transfer.dto';

@Injectable()
export class TransferService {
  create(createTransferDto: CreateTransferDto) {
    return 'This action adds a new transfer';
  }

  findAll() {
    return `This action returns all transfer`;
  }

}
