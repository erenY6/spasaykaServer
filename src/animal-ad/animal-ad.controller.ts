import { Controller, Get, Post, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AnimalAdService } from './animal-ad.service';

@Controller('animal-ad')
export class AnimalAdController {
  constructor(private readonly animalAdService: AnimalAdService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './images', 
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + extname(file.originalname));
      }
    }),
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body) {
    const { name, gender, age, info1, info2, description } = body;
    return await this.animalAdService.createAd({
      name,
      gender,
      age,
      info1,
      info2,
      description,
      image: `/images/${file.filename}`
    });
  }

  @Get()
  async getAds() {
    return await this.animalAdService.getAds();
  }
}
