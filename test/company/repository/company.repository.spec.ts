import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JsonCompanyRepository } from '../../../src/company/repository/company.repository';
import { CompanyDto } from '../../../src/company/interfaces/create-company.dto';
import { CompanyPymeDto } from '../../../src/company/interfaces/create-company-pyme.dto';
import { CompanyCorporateDto } from '../../../src/company/interfaces/create-company-corporate.dto';

jest.mock('node:fs', () => ({
  promises: {
    readFile: jest.fn(),
    writeFile: jest.fn(),
  },
}));

jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

const { promises: fs } = require('node:fs');
const { v4: uuidv4 } = require('uuid');

describe('JsonCompanyRepository', () => {
  let repository: JsonCompanyRepository;
  const mockReadFile = fs.readFile as jest.MockedFunction<typeof fs.readFile>;
  const mockWriteFile = fs.writeFile as jest.MockedFunction<
    typeof fs.writeFile
  >;

  beforeEach(() => {
    repository = new JsonCompanyRepository();
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all companies from file', async () => {
      const mockCompanies = [
        { id: '1', company_cuit: '12345', company_type: 'PyME' },
      ];
      mockReadFile.mockResolvedValue(JSON.stringify(mockCompanies));

      const result = await repository.findAll();

      expect(result).toEqual(mockCompanies);
      expect(mockReadFile).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when file is empty', async () => {
      mockReadFile.mockResolvedValue('');

      const result = await repository.findAll();

      expect(result).toEqual([]);
    });

    it('should throw error when file read fails', async () => {
      mockReadFile.mockRejectedValue(new Error('File not found'));

      await expect(repository.findAll()).rejects.toThrow('File not found');
    });
  });

  describe('create', () => {
    beforeEach(() => {
      uuidv4.mockReturnValue('mock-uuid');
    });

    it('should create a generic company', async () => {
      const companyDto: CompanyDto = {
        company_cuit: '12345',
        company_type: 'Generic',
      } as CompanyDto;
      mockReadFile.mockResolvedValue('[]');
      mockWriteFile.mockResolvedValue(undefined);

      const result = await repository.create(companyDto);

      expect(result).toEqual({ id: 'mock-uuid', ...companyDto });
      expect(mockWriteFile).toHaveBeenCalledTimes(1);
    });

    it('should create a PyME company with defaults', async () => {
      const pymeDto: CompanyPymeDto = {
        company_cuit: '12345',
        company_type: 'PyME',
      } as CompanyPymeDto;
      mockReadFile.mockResolvedValue('[]');
      mockWriteFile.mockResolvedValue(undefined);

      const result = await repository.create(pymeDto);

      expect(result).toMatchObject({
        id: 'mock-uuid',
        company_cuit: '12345',
        company_type: 'PyME',
        company_require_manual_approval: false,
        company_category_pyme: 'Pequeña',
      });
    });

    it('should create a Corporativa company with defaults', async () => {
      const corporateDto: CompanyCorporateDto = {
        company_cuit: '12345',
        company_type: 'Corporativa',
      } as CompanyCorporateDto;
      mockReadFile.mockResolvedValue('[]');
      mockWriteFile.mockResolvedValue(undefined);

      const result = await repository.create(corporateDto);

      expect(result).toMatchObject({
        id: 'mock-uuid',
        company_cuit: '12345',
        company_type: 'Corporativa',
        company_proxies: [],
        company_shareholders: [],
      });
      expect(result).toHaveProperty('company_resolution_time');
    });
    it('should throw ConflictException when CUIT already exists', async () => {
      const existingCompanies = [
        { id: '1', company_cuit: '12345', company_type: 'PyME' },
      ];
      mockReadFile.mockResolvedValue(JSON.stringify(existingCompanies));

      const companyDto: CompanyDto = {
        company_cuit: '12345',
        company_type: 'Generic',
      } as CompanyDto;

      await expect(repository.create(companyDto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throw InternalServerErrorException on write error', async () => {
      const companyDto: CompanyDto = {
        company_cuit: '12345',
        company_type: 'Generic',
      } as CompanyDto;
      mockReadFile.mockResolvedValue('[]');
      mockWriteFile.mockRejectedValue(new Error('Write failed'));

      await expect(repository.create(companyDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
