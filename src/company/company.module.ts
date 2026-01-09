import { Module } from '@nestjs/common';
import { CompanyService } from './services/company.service';
import { CompanyController } from './controllers/company.controller';
import { JsonCompanyRepository } from './repository/company.repository';
import { TransferModule } from '../transfer/transfer.module';

@Module({
  imports: [TransferModule],
  controllers: [CompanyController],
  providers: [CompanyService, JsonCompanyRepository],
})
export class CompanyModule {}
