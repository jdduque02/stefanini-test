import { Module } from '@nestjs/common';
import { TransferService } from './services/transfer.service';
import { TransferController } from './controllers/transfer.controller';

@Module({
  controllers: [TransferController],
  providers: [TransferService],
})
export class TransferModule {}
