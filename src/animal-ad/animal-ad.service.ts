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
    address?: string;
    coordinates?: string;
    description?: string;
    fullDesc?: string;
    visibleName?: boolean;
    visibleSurname?: boolean;
    visibleEmail?: boolean;
    visiblePhone?: boolean;
    imageUrls: string[]; 
    tagIds: string[]; 
    authorId: string;
  }) {
    return await this.prisma.animalAd.create({
      data: {
        name: data.name,
        gender: data.gender,
        age: data.age,
        info1: data.info1,
        info2: data.info2,
        address: data.address,
        coordinates: data.coordinates,
        description: data.description,
        visibleName: String(data.visibleName) === 'true',
        visibleSurname: String(data.visibleSurname) === 'true',
        visibleEmail: String(data.visibleEmail) === 'true',
        visiblePhone: String(data.visiblePhone) === 'true',
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

  async deleteAdById(id: string) {
    await this.prisma.animalTag.deleteMany({
      where: { id: id },
    })
    return await this.prisma.animalAd.delete({
      where: { id }
    })
  }

  async getAdsByAuthor(authorId: string) {
    return await this.prisma.animalAd.findMany({
      where: { authorId },
      include: {
        images: true,
        tags: true,
        author: true
      }
    });
  }

  async updateAd(id: string, data: {
    name: string;
    gender: string;
    age: string;
    info1?: string;
    info2?: string;
    address?: string | null;
    coordinates?: string | null;
    description?: string;
    fullDesc?: string;
    visibleName?: boolean;
    visibleSurname?: boolean;
    visibleEmail?: boolean;
    visiblePhone?: boolean;

    tagIds: string[];
    imageUrls: string[];
  }) {
    await this.prisma.animalImage.deleteMany({ where: { adId: id } });
    await this.prisma.animalAd.update({
      where: { id },
      data: {
        tags: { set: [] } 
      }
    });
  
    return await this.prisma.animalAd.update({
      where: { id },
      data: {
        name: data.name,
        gender: data.gender,
        age: data.age,
        info1: data.info1,
        info2: data.info2,
        address: data.address,
        coordinates: data.coordinates,
        description: data.description,
        fullDesc: data.fullDesc,
        visibleName: String(data.visibleName) === 'true',
        visibleSurname: String(data.visibleSurname) === 'true',
        visibleEmail: String(data.visibleEmail) === 'true',
        visiblePhone: String(data.visiblePhone) === 'true',
        tags: {
          connect: data.tagIds.map(id => ({ id }))
        },
        images: {
          create: data.imageUrls.map(url => ({ url }))
        }
      },
      include: {
        tags: true,
        images: true,
        author: true
      }
    });
  }
}
