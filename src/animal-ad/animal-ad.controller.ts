import { Controller, Get } from '@nestjs/common';
import { AnimalAdService } from './animal-ad.service';

@Controller('animal-ad')
export class AnimalAdController {
  constructor(private readonly animalAdService: AnimalAdService) {}

  @Get()
  async getAds() {
    return await this.animalAdService.getAds();
  }
}
