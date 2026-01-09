import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponseDto<T> {
  @ApiProperty({ description: 'Datos de la página actual' })
  data: T[];

  @ApiProperty({ description: 'Total de elementos' })
  total: number;

  @ApiProperty({ description: 'Página actual' })
  page: number;

  @ApiProperty({ description: 'Elementos por página' })
  limit: number;

  @ApiProperty({ description: 'Total de páginas' })
  totalPages: number;

}
