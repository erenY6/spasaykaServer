import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimalAdService } from './animal-ad/animal-ad.service';
import { AnimalAdController } from './animal-ad/animal-ad.controller';
import { AnimalAdModule } from './animal-ad/animal-ad.module';

@Module({
  imports: [AnimalAdModule],
  controllers: [AppController, AnimalAdController],
  providers: [AppService, AnimalAdService],
})
export class AppModule {}
