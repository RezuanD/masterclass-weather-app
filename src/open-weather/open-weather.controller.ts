import { Controller, Get, Query } from '@nestjs/common';
import { OpenWeatherService } from './open-weather.service';
import { CityCordsDTO, OpenWeatherAPIKeyDTO } from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { WeatherDto } from './dto/weather.dto';

@ApiTags('open-weather')
@Controller('open-weather')
export class OpenWeatherController {
  constructor(private readonly openWeatherService: OpenWeatherService) {}

  @Get('api-key')
  @ApiResponse({
    type: OpenWeatherAPIKeyDTO,
    status: 200,
  })
  getApiKey(): OpenWeatherAPIKeyDTO {
    return this.openWeatherService.getApiKey();
  }

  @Get('/city-cords')
  @ApiResponse({
    type: CityCordsDTO,
    status: 200,
  })
  getCityCords(@Query('cityName') cityName: string): Promise<CityCordsDTO> {
    return this.openWeatherService.getCityCordsByName(cityName);
  }

  @Get('/city-weather')
  @ApiResponse({
    type: WeatherDto,
    status: 200,
  })
  getCityWeather(@Query('cityName') cityName: string): Promise<WeatherDto> {
    return this.openWeatherService.getWeatherByCityName(cityName);
  }
}
