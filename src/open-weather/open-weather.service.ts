import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenWeatherAPIKeyDTO } from './dto';

@Injectable()
export class OpenWeatherService {
  private readonly openWeatherAPIKey: string;

  constructor(private readonly configService: ConfigService) {
    this.openWeatherAPIKey = this.configService.getOrThrow<string>(
      'OPEN_WEATHER_API_KEY',
    );
  }

  getApiKey(): OpenWeatherAPIKeyDTO {
    return {
      apiKey: this.openWeatherAPIKey,
    };
  }
}
