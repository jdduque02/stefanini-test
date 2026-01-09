import { Test, TestingModule } from '@nestjs/testing';
import { TransferController } from '../../../src/transfer/controllers/transfer.controller';
import { TransferService } from '../../../src/transfer/services/transfer.service';
import { CreateTransferDto } from '../../../src/transfer/interfaces/create-transfer.dto';
import { ResponseTransferDto } from '../../../src/transfer/interfaces/response-transfer.dto';

describe('TransferController', () => {
  let controller: TransferController;
  let service: TransferService;

  const mockTransferService = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransferController],
      providers: [
        {
          provide: TransferService,
          useValue: mockTransferService,
        },
      ],
    }).compile();

    controller = module.get<TransferController>(TransferController);
    service = module.get<TransferService>(TransferService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a transfer successfully', async () => {
      const createTransferDto: CreateTransferDto = {
        transfer_company_id: '123',
        transfer_amount: 1000,
        transfer_type: 'Débito',
      };

      const expectedResponse: ResponseTransferDto = {
        id: '1',
        transfer_company_id: '123',
        transfer_amount: 1000,
        transfer_type: 'Débito',
        transfer_date: new Date(),
        transfer_status: 'pending',
      };

      mockTransferService.create.mockResolvedValue(expectedResponse);

      const result = await controller.create(createTransferDto);

      expect(result).toEqual(expectedResponse);
      expect(service.create).toHaveBeenCalledWith(createTransferDto);
      expect(service.create).toHaveBeenCalledTimes(1);
    });

    it('should handle service errors', async () => {
      const createTransferDto: CreateTransferDto = {
        transfer_company_id: '123',
        transfer_amount: 1000,
        transfer_type: 'Débito',
      };

      const error = new Error('Unexpected error');
      mockTransferService.create.mockRejectedValue(error);

      await expect(controller.create(createTransferDto)).rejects.toThrow(error);
      expect(service.create).toHaveBeenCalledWith(createTransferDto);
    });

    it('should call service with correct parameters', async () => {
      const createTransferDto: CreateTransferDto = {
        transfer_company_id: '456',
        transfer_amount: 5000,
        transfer_type: 'Crédito',
      };

      mockTransferService.create.mockResolvedValue({});

      await controller.create(createTransferDto);

      expect(service.create).toHaveBeenCalledWith(createTransferDto);
    });
  });
});
