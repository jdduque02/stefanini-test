import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, InternalServerErrorException, Logger } from '@nestjs/common';
import { promises as fs } from 'node:fs';
import { JsonTransferRepository } from '../../../src/transfer/repository/transfer.repository';
import { CreateTransferDto } from '../../../src/transfer/interfaces/create-transfer.dto';
import { Transfer } from '../../../src/transfer/entities/transfer.entity';
import { Company } from '../../../src/company/entities/company.entity';

jest.mock('node:fs', () => ({
    promises: {
        readFile: jest.fn(),
        writeFile: jest.fn(),
    },
}));

jest.mock('uuid', () => ({
    v4: jest.fn(() => 'mock-uuid-1234'),
}));

describe('JsonTransferRepository', () => {
    let repository: JsonTransferRepository;
    const mockReadFile = fs.readFile as jest.MockedFunction<typeof fs.readFile>;
    const mockWriteFile = fs.writeFile as jest.MockedFunction<typeof fs.writeFile>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [JsonTransferRepository],
        }).compile();

        repository = module.get<JsonTransferRepository>(JsonTransferRepository);
        jest.clearAllMocks();
        jest.spyOn(Logger, 'error').mockImplementation();
    });

    describe('findAll', () => {
        it('should return all transfers from file', async () => {
            const mockTransfers: Transfer[] = [
                { id: '1', transfer_company_id: 'company-1', transfer_is_active: true } as Transfer,
            ];
            mockReadFile.mockResolvedValue(JSON.stringify(mockTransfers));

            const result = await repository.findAll();

            expect(result).toEqual(mockTransfers);
            expect(mockReadFile).toHaveBeenCalledTimes(1);
        });

        it('should return empty array when file is empty', async () => {
            mockReadFile.mockResolvedValue('');

            const result = await repository.findAll();

            expect(result).toEqual([]);
        });

        it('should throw error when file read fails', async () => {
            mockReadFile.mockRejectedValue(new Error('File read error'));

            await expect(repository.findAll()).rejects.toThrow('File read error');
        });
    });

    describe('create', () => {
        const mockCreateTransferDto: CreateTransferDto = {
            transfer_company_id: 'company-1',
            transfer_amount: 1000,
        } as CreateTransferDto;

        const mockCompanies: Company[] = [
            { id: 'company-1', name: 'Test Company' } as Company,
        ];

        it('should create a new transfer successfully', async () => {
            mockReadFile
                .mockResolvedValueOnce(JSON.stringify(mockCompanies))
                .mockResolvedValueOnce(JSON.stringify([]));
            mockWriteFile.mockResolvedValue(undefined);

            const result = await repository.create(mockCreateTransferDto);

            expect(result).toMatchObject({
                id: 'mock-uuid-1234',
                transfer_company_id: 'company-1',
                transfer_amount: 1000,
                transfer_status: 'Pendiente',
                transfer_is_active: true,
            });
            expect(mockWriteFile).toHaveBeenCalledTimes(1);
        });

        it('should throw NotFoundException when company does not exist', async () => {
            mockReadFile.mockResolvedValueOnce(JSON.stringify([]));

            await expect(repository.create(mockCreateTransferDto)).rejects.toThrow(
                NotFoundException,
            );
            await expect(repository.create(mockCreateTransferDto)).rejects.toThrow(
                `No existe una empresa con el ID ${mockCreateTransferDto.transfer_company_id}`,
            );
        });

        it('should use provided transfer_date and transfer_status', async () => {
            const dtoWithOptionals: CreateTransferDto = {
                ...mockCreateTransferDto,
                transfer_date: new Date('2024-01-01'),
                transfer_status: 'Aprobado',
            } as CreateTransferDto;

            mockReadFile
                .mockResolvedValueOnce(JSON.stringify(mockCompanies))
                .mockResolvedValueOnce(JSON.stringify([]));
            mockWriteFile.mockResolvedValue(undefined);

            const result = await repository.create(dtoWithOptionals);

            expect(result.transfer_date).toEqual(new Date('2024-01-01'));
            expect(result.transfer_status).toBe('Aprobado');
        });

        it('should throw InternalServerErrorException when write fails', async () => {
            mockReadFile
                .mockResolvedValueOnce(JSON.stringify(mockCompanies))
                .mockResolvedValueOnce(JSON.stringify([]));
            mockWriteFile.mockRejectedValue(new Error('Write error'));

            await expect(repository.create(mockCreateTransferDto)).rejects.toThrow(
                InternalServerErrorException,
            );
        });

        it('should return empty companies array when company file read fails', async () => {
            mockReadFile.mockRejectedValueOnce(new Error('Company file error'));

            await expect(repository.create(mockCreateTransferDto)).rejects.toThrow(
                NotFoundException,
            );
        });
    });
});