import { Injectable } from '@nestjs/common';
import { MessageDTO } from './common/dto';

@Injectable()
export class AppService {
  healthCheck(): MessageDTO {
    return { message: 'up' };
  }
}
