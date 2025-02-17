import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class MessageDTO {
  @ApiProperty({ example: 'up' })
  @IsString()
  message!: string;
}
