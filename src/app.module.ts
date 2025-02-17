import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { OpenWeatherModule } from './open-weather/open-weather.module';

@Module({
  imports: [ConfigModule.forRoot(), OpenWeatherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
