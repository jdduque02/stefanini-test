import { Module } from '@nestjs/common';
import { CompanyService } from './services/company.service';
import { CompanyController } from './controllers/company.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {ThrottlerModule, ThrottlerModuleOptions} from '@nestjs/throttler';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<ThrottlerModuleOptions> => ({
        throttlers: [
          {
            ttl: Number(configService.get('RATE_LIMIT_TTL', 60)),
            limit: Number(configService.get('RATE_LIMIT_MAX', 100)),
          }
        ]
      }),
    }),
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class AppModule {}
