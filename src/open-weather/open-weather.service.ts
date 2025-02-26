import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CityCordsDTO, OpenWeatherAPIKeyDTO } from './dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
  OpenWeatherCordsWeatherData,
  OpenWeatherLocation,
} from './open-weather.interfaces';
import { WeatherDto } from './dto/weather.dto';

@Injectable()
export class OpenWeatherService {
  private readonly openWeatherAPIKey: string;
  private readonly openWeatherAPIURL: string;
  private readonly openWeatherGeoAPIURL: string;
  private readonly openWeatherAPIWeatherAPIURL: string;
  private readonly measureUnits = 'metric';

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.openWeatherAPIKey = this.configService.getOrThrow<string>(
      'OPEN_WEATHER_API_KEY',
    );
    this.openWeatherAPIURL = this.configService.getOrThrow<string>(
      'OPEN_WEATHER_API_URL',
    );
    this.openWeatherAPIWeatherAPIURL = `${this.openWeatherAPIURL}/data/2.5/weather`;
    this.openWeatherGeoAPIURL = `${this.openWeatherAPIURL}/geo/1.0/direct`;
  }

  public getApiKey(): OpenWeatherAPIKeyDTO {
    return {
      apiKey: this.openWeatherAPIKey,
    };
  }

  public async getCityCordsByName(cityName: string): Promise<CityCordsDTO> {
    const response = await firstValueFrom(
      this.httpService.get<OpenWeatherLocation[]>(
        `${this.openWeatherGeoAPIURL}?q=${cityName}&appid=${this.openWeatherAPIKey}`,
      ),
    );

    const cities = response.data;

    if (!cities.length) {
      throw new NotFoundException(`No city found with name: ${cityName}`);
    }

    const firstCityFromResponse = cities[0];

    return { lon: firstCityFromResponse.lon, lat: firstCityFromResponse.lat };
  }

  public async getWeatherByCords(
    lon: number,
    lat: number,
  ): Promise<WeatherDto> {
    const response = await firstValueFrom(
      this.httpService.get<OpenWeatherCordsWeatherData>(
        `${this.openWeatherAPIWeatherAPIURL}?lat=${lat}&lon=${lon}&units=${this.measureUnits}&appid=${this.openWeatherAPIKey}`,
      ),
    );

    const cityWeatherData = response.data;

    return {
      cords: { lon, lat },
      temperature: cityWeatherData.main.temp,
      feelsLikeTemperature: cityWeatherData.main.feels_like,
      atmosphericPressure: cityWeatherData.main.pressure,
      windSpeed: cityWeatherData.wind.speed,
      countryCode: cityWeatherData.sys.country,
      cityName: cityWeatherData.name,
    };
  }

  public async getWeatherByCityName(cityName: string): Promise<WeatherDto> {
    const cityCords = await this.getCityCordsByName(cityName);

    const response = await firstValueFrom(
      this.httpService.get<OpenWeatherCordsWeatherData>(
        `${this.openWeatherAPIWeatherAPIURL}?lat=${cityCords.lat}&lon=${cityCords.lon}&units=${this.measureUnits}&appid=${this.openWeatherAPIKey}`,
      ),
    );

    const cityWeatherData = response.data;

    return {
      cords: cityCords,
      temperature: cityWeatherData.main.temp,
      feelsLikeTemperature: cityWeatherData.main.feels_like,
      atmosphericPressure: cityWeatherData.main.pressure,
      windSpeed: cityWeatherData.wind.speed,
      countryCode: cityWeatherData.sys.country,
      cityName: cityWeatherData.name,
    };
  }
}
