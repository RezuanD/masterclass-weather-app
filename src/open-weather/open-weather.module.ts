import { Module } from '@nestjs/common';
import { OpenWeatherController } from './open-weather.controller';
import { OpenWeatherService } from './open-weather.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [OpenWeatherController],
  providers: [OpenWeatherService],
})
export class OpenWeatherModule {}
