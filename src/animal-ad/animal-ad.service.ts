import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AnimalAdService {
  private prisma = new PrismaClient();

  async createAd(data) {
    return await this.prisma.animalAd.create({ data });
  }

  async getAds() {
    return await this.prisma.animalAd.findMany();
  }
}
