import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from '../../../src/company/controllers/company.controller';
import { CompanyService } from '../../../src/company/services/company.service';
import { CompanyPymeDto } from '../../../src/company/interfaces/create-company-pyme.dto';
import { CompanyCorporateDto } from '../../../src/company/interfaces/create-company-corporate.dto';
import { CompanyFilterDto } from '../../../src/company/interfaces/company-filter.dto';

describe('CompanyController', () => {
  let controller: CompanyController;
  let service: CompanyService;

  const mockCompanyService = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [
        {
          provide: CompanyService,
          useValue: mockCompanyService,
        },
      ],
    }).compile();

    controller = module.get<CompanyController>(CompanyController);
    service = module.get<CompanyService>(CompanyService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a PyME company', async () => {
      const pymeDto: CompanyPymeDto = {
        name: 'Test PyME',
        cuit: '20-12345678-9',
        type: 'PYME',
      } as CompanyPymeDto;

      const expectedResponse = {
        id: '1',
        ...pymeDto,
      };

      mockCompanyService.create.mockResolvedValue(expectedResponse);

      const result = await controller.create(pymeDto);

      expect(service.create).toHaveBeenCalledWith(pymeDto);
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResponse);
    });
    it('should create a Corporate company', async () => {
      const corporateDto: CompanyCorporateDto = {
        name: 'Test Corporate',
        cuit: '30-12345678-9',
        type: 'CORPORATE',
      } as CompanyCorporateDto;

      const expectedResponse = {
        id: '2',
        ...corporateDto,
      };

      mockCompanyService.create.mockResolvedValue(expectedResponse);

      const result = await controller.create(corporateDto);

      expect(service.create).toHaveBeenCalledWith(corporateDto);
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('findAll', () => {
    it('should return paginated companies with default filters', async () => {
      const filterDto: CompanyFilterDto = {} as CompanyFilterDto;

      const expectedResponse = {
        data: [],
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
      };

      mockCompanyService.findAll.mockResolvedValue(expectedResponse);

      const result = await controller.findAll(filterDto);

      expect(service.findAll).toHaveBeenCalledWith(filterDto);
      expect(service.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResponse);
    });

    it('should return filtered and paginated companies', async () => {
      const filterDto: CompanyFilterDto = {
        name: 'Test',
        cuit: '20-12345678-9',
        type: 'PYME',
        page: 2,
        limit: 5,
      } as CompanyFilterDto;

      const expectedResponse = {
        data: [
          {
            id: '1',
            name: 'Test Company',
            cuit: '20-12345678-9',
            type: 'PYME',
          },
        ],
        total: 1,
        page: 2,
        limit: 5,
        totalPages: 1,
      };

      mockCompanyService.findAll.mockResolvedValue(expectedResponse);

      const result = await controller.findAll(filterDto);

      expect(service.findAll).toHaveBeenCalledWith(filterDto);
      expect(service.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResponse);
    });
  });
});
