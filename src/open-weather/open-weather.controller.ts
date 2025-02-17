import { Controller, Get } from '@nestjs/common';
import { OpenWeatherService } from './open-weather.service';
import { OpenWeatherAPIKeyDTO } from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('open-weather')
@Controller('open-weather')
export class OpenWeatherController {
  constructor(private readonly openWeatherService: OpenWeatherService) {}

  @Get('api-key')
  @ApiResponse({
    example: { apiKey: 'your key' },
    type: OpenWeatherAPIKeyDTO,
    status: 200,
  })
  getApiKey(): OpenWeatherAPIKeyDTO {
    return this.openWeatherService.getApiKey();
  }
}
