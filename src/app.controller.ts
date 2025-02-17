import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessageDTO } from './common/dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({ type: MessageDTO, status: 200, description: 'Health check' })
  healthCheck(): MessageDTO {
    return this.appService.healthCheck();
  }
}
