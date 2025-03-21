import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AnimalAdService {
  private prisma = new PrismaClient();

  async getAds() {
    return await this.prisma.animalAd.findMany();
  }
}
