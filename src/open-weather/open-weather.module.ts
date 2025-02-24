import { Module } from '@nestjs/common';
import { OpenWeatherController } from './open-weather.controller';
import { OpenWeatherService } from './open-weather.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [OpenWeatherController],
  providers: [OpenWeatherService],
})
export class OpenWeatherModule {}
