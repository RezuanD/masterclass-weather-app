import { ApiProperty } from '@nestjs/swagger';

export class CityCordsDTO {
  @ApiProperty({ example: '51' })
  lat!: number;

  @ApiProperty({ example: '51' })
  lon!: number;
}
