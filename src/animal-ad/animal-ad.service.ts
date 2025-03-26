import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AnimalAdService {
  private prisma = new PrismaClient();

  async createAd(data: {
    name: string;
    gender: string;
    age: string;
    info1?: string;
    info2?: string;
    description?: string;
    fullDesc?: string;
    imageUrls: string[]; // массив путей картинок
    tagIds: string[]; // массив ID тегов
    authorId: string;
  }) {
    return await this.prisma.animalAd.create({
      data: {
        name: data.name,
        gender: data.gender,
        age: data.age,
        info1: data.info1,
        info2: data.info2,
        description: data.description,
        fullDesc: data.fullDesc,
        author: { connect: { id: data.authorId } },
        tags: {
          connect: (data.tagIds || []).map(id => ({ id }))
        },
        images: {
          create: (data.imageUrls || []).map(url => ({ url }))
        }
      },
      include: {
        tags: true,
        images: true,
        author: true
      }
    });
  }

  async getAds() {
    return await this.prisma.animalAd.findMany({
      include: {
        images: true,
        tags: true,
        author: true
      }
    });
  }

  async getAdById(id: string) {
    return await this.prisma.animalAd.findUnique({
      where: { id },
      include: {
        images: true,
        tags: true,
        author: true
      }
    })
  }
}
