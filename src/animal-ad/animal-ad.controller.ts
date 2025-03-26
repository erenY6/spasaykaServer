import {
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
  Body,
  Param
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AnimalAdService } from './animal-ad.service';

@Controller('animal-ad')
export class AnimalAdController {
  constructor(private readonly animalAdService: AnimalAdService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('images', 5, {
    storage: diskStorage({
      destination: './images',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + extname(file.originalname));
      }
    }),
  }))
  async uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body
  ) {
    const { name, gender, age, info1, info2, description, fullDesc, authorId, tagIds } = body;
    

    const imageUrls = files.map(file => `/images/${file.filename}`);

    // Теги могут приходить как строка через запятую
    const tagIdArray = typeof body.tags === 'string' ? body.tags.split(',') : body.tags || []


    return await this.animalAdService.createAd({
      name,
      gender,
      age,
      info1,
      info2,
      description,
      fullDesc,
      authorId,
      imageUrls,
      tagIds: tagIdArray
    });
  }

  @Get()
  async getAds() {
    return await this.animalAdService.getAds();
  }

  @Get(':id')
  async getAdById(@Param('id') id: string) {
    return this.animalAdService.getAdById(id)
}
}
