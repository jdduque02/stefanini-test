import { Controller, Get, Post, Body, Version } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { TransferService } from '../services/transfer.service';
import { CreateTransferDto } from '../interfaces/create-transfer.dto';
import { ResponseTransferDto } from '../interfaces/response-transfer.dto';

@ApiTags('Transfer')
@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Version('1')
  @Post()
  @ApiOperation({ summary: 'Crear una nueva transferencia' })
  @ApiBody({
    description: 'Datos de la transferencia a crear',
    type: CreateTransferDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Transferencia creada exitosamente',
    type: ResponseTransferDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
    schema: {
      example: {
        message: [
          'El monto debe ser un número',
          'El tipo de transferencia debe ser Débito o Crédito',
        ],
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Empresa no encontrada',
    schema: {
      example: {
        message: 'La empresa con el ID especificado no existe',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor',
    schema: {
      example: {
        message: 'Unexpected error',
        error: 'Internal Server Error',
        statusCode: 500,
      },
    },
  })
  create(@Body() createTransferDto: CreateTransferDto) {
    return this.transferService.create(createTransferDto);
  }
}
