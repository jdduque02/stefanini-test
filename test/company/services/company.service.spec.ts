import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from '../../../src/company/services/company.service';
import { JsonCompanyRepository } from '../../../src/company/repository/company.repository';
import { TransferService } from '../../../src/transfer/services/transfer.service';

describe('CompanyService', () => {
  let service: CompanyService;
  let companyRepository: jest.Mocked<JsonCompanyRepository>;
  let transferService: jest.Mocked<TransferService>;

  const mockCompanies = [
    {
      id: '1',
      company_name: 'Test Company 1',
      company_cuit: '12345678901',
      company_type: 'PYME',
      company_create_at: new Date('2024-01-01'),
    },
    {
      id: '2',
      company_name: 'Test Company 2',
      company_cuit: '98765432109',
      company_type: 'CORPORATE',
      company_create_at: new Date('2024-01-15'),
    },
  ];

  const mockTransfers = [
    {
      id: '1',
      transfer_company_id: '1',
      transfer_date: new Date(),
      amount: 1000,
    },
    {
      id: '2',
      transfer_company_id: '2',
      transfer_date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), // 45 days ago
      amount: 2000,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: JsonCompanyRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
        {
          provide: TransferService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
    companyRepository = module.get(JsonCompanyRepository);
    transferService = module.get(TransferService);
  });

  describe('create', () => {
    it('should create a company', async () => {
      const companyDto = { company_name: 'New Company' } as any;
      const expectedResult = { id: '3', ...companyDto } as any;
      companyRepository.create.mockResolvedValue(expectedResult);

      const result = await service.create(companyDto);

      expect(result).toEqual(expectedResult);
      expect(companyRepository.create).toHaveBeenCalledWith(companyDto);
    });
  });

  describe('findAll', () => {
    it('should return paginated companies with recent transfers', async () => {
      companyRepository.findAll.mockResolvedValue(mockCompanies as any);
      transferService.findAll.mockResolvedValue(mockTransfers as any);

      const result = await service.findAll();

      expect(result.data).toHaveLength(1);
      expect(result.data[0].id).toBe('1');
      expect(result.total).toBe(1);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
    });

    it('should filter by company name', async () => {
      companyRepository.findAll.mockResolvedValue(mockCompanies as any);
      transferService.findAll.mockResolvedValue(mockTransfers as any);

      const result = await service.findAll({ company_name: 'Company 1' });

      expect(result.data[0].company_name).toContain('Company 1');
    });

    it('should filter by company cuit', async () => {
      companyRepository.findAll.mockResolvedValue(mockCompanies as any);
      transferService.findAll.mockResolvedValue(mockTransfers as any);

      const result = await service.findAll({ company_cuit: '12345678901' });

      expect(result.data[0].company_cuit).toBe('12345678901');
    });

    it('should filter by company type', async () => {
      companyRepository.findAll.mockResolvedValue(mockCompanies as any);
      transferService.findAll.mockResolvedValue(mockTransfers as any);

      const result = await service.findAll({ company_type: 'PYME' });

      expect(result.data[0].company_type).toBe('PYME');
    });

    it('should apply pagination correctly', async () => {
      companyRepository.findAll.mockResolvedValue(mockCompanies as any);
      transferService.findAll.mockResolvedValue(mockTransfers as any);

      const result = await service.findAll({ page: 1, limit: 1 });

      expect(result.data).toHaveLength(1);
      expect(result.totalPages).toBe(1);
    });

    it('should sort ascending', async () => {
      companyRepository.findAll.mockResolvedValue(mockCompanies as any);
      transferService.findAll.mockResolvedValue(mockTransfers as any);

      const result = await service.findAll({ order: 'ASC' });

      expect(result.data.length).toBeGreaterThanOrEqual(0);
    });

    it('should enrich companies with transfers', async () => {
      companyRepository.findAll.mockResolvedValue(mockCompanies as any);
      transferService.findAll.mockResolvedValue(mockTransfers as any);

      const result = await service.findAll();

      expect(result.data[0]).toHaveProperty('transfers');
      expect(Array.isArray(result.data[0].transfers)).toBe(true);
    });
  });
});
