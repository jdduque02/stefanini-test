export class Company {
  id: string;
  company_name: string;
  company_cuit: string;
  company_type: string;
  company_address: string;
  company_create_at?: Date = new Date();
  company_update_at?: Date = new Date();
  company_isactive?: boolean = true;
  company_number_employees: number = 0;
  company_annual_billing: number = 0;
  company_daily_transfer_limit: number = 0;
  company_monthly_transfer_limit: number = 0;
}
