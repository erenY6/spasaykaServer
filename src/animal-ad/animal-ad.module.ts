import { Module } from '@nestjs/common';
import { AnimalAdController } from './animal-ad.controller';
import { AnimalAdService } from './animal-ad.service';

@Module({
  controllers: [AnimalAdController],
  providers: [AnimalAdService],
})
export class AnimalAdModule {}
