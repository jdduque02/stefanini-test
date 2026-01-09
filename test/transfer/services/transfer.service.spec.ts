import { Test, TestingModule } from '@nestjs/testing';
import { TransferService } from '../../../src/transfer/services/transfer.service';
import { JsonTransferRepository } from '../../../src/transfer/repository/transfer.repository';
import { CreateTransferDto } from '../../../src/transfer/interfaces/create-transfer.dto';
import { ResponseTransferDto } from '../../../src/transfer/interfaces/response-transfer.dto';

describe('TransferService', () => {
    let service: TransferService;
    let repository: JsonTransferRepository;

    const mockRepository = {
        create: jest.fn(),
        findAll: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TransferService,
                {
                    provide: JsonTransferRepository,
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<TransferService>(TransferService);
        repository = module.get<JsonTransferRepository>(JsonTransferRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a transfer', async () => {
            const createDto: CreateTransferDto = {
                amount: 100,
                fromAccount: 'ACC001',
                toAccount: 'ACC002',
            } as CreateTransferDto;

            const expectedResponse: ResponseTransferDto = {
                id: '1',
                ...createDto,
                createdAt: new Date(),
            } as ResponseTransferDto;

            mockRepository.create.mockResolvedValue(expectedResponse);

            const result = await service.create(createDto);

            expect(result).toEqual(expectedResponse);
            expect(repository.create).toHaveBeenCalledWith(createDto);
            expect(repository.create).toHaveBeenCalledTimes(1);
        });
    });

    describe('findAll', () => {
        it('should return an array of transfers', async () => {
            const expectedTransfers: ResponseTransferDto[] = [
                { id: '1', amount: 100 } as ResponseTransferDto,
                { id: '2', amount: 200 } as ResponseTransferDto,
            ];

            mockRepository.findAll.mockResolvedValue(expectedTransfers);

            const result = await service.findAll();

            expect(result).toEqual(expectedTransfers);
            expect(repository.findAll).toHaveBeenCalledTimes(1);
        });

        it('should return an empty array when no transfers exist', async () => {
            mockRepository.findAll.mockResolvedValue([]);

            const result = await service.findAll();

            expect(result).toEqual([]);
            expect(repository.findAll).toHaveBeenCalledTimes(1);
        });
    });
});