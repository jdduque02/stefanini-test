import { Module } from '@nestjs/common';
import { TransferService } from './services/transfer.service';
import { TransferController } from './controllers/transfer.controller';
import { JsonTransferRepository } from './repository/transfer.repository';

@Module({
  controllers: [TransferController],
  providers: [TransferService, JsonTransferRepository],
  exports: [TransferService],
})
export class TransferModule {}
