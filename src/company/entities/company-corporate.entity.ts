import { Company } from './company.entity';
import { ProxyDto } from '../interfaces/create-proxy.dto';
import { ShareholderDto } from '../interfaces/create-share-holder.dto';

export class CompanyCorporate extends Company {
  company_resolution_time: Date;
  company_proxies: ProxyDto[];
  company_shareholders: ShareholderDto[];
}
