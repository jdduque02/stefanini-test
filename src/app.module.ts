import { Module } from '@nestjs/common';
import { CompanyService } from './company/services/company.service';
import { CompanyController } from './company/controllers/company.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler';
import { CompanyModule } from './company/company.module';
import {TransferModule} from './transfer/transfer.module';
import { TransferController } from './transfer/controllers/transfer.controller';
import { TransferService } from './transfer/services/transfer.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<ThrottlerModuleOptions> => ({
        throttlers: [
          {
            ttl: Number(configService.get('RATE_LIMIT_TTL', 60)),
            limit: Number(configService.get('RATE_LIMIT_MAX', 100)),
          },
        ],
      }),
    }),
    CompanyModule,
    TransferModule,
  ],
  controllers: [CompanyController, TransferController],
  providers: [CompanyService, TransferService],
})
export class AppModule {}
