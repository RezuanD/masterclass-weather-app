import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getOpenWeatherApiKey(): Record<string, string> {
    return {
      OPEN_WEATHER_API_KEY:
        this.configService.get('OPEN_WEATHER_API_KEY') ?? 'NO KEY',
    };
  }
}
