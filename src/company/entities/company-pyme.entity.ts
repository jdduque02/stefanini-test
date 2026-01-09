import { Company } from './company.entity';

export class CompanyPyme extends Company {
    company_require_manual_approval: boolean;
    company_category_pyme: string;
}