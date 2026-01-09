import {
  Controller,
  Get,
  Post,
  Body,
  Version
} from '@nestjs/common';
import { TransferService } from '../services/transfer.service';
import { CreateTransferDto } from '../interfaces/create-transfer.dto';

@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}
  @Version('1')
  @Post()
  create(@Body() createTransferDto: CreateTransferDto) {
    return this.transferService.create(createTransferDto);
  }
  
  @Version('1')
  @Get()
  findAll() {
    return this.transferService.findAll();
  }
}
