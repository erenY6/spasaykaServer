import {
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
  Body,
  Param,
  Delete,
  Put
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
    const { name, gender, age, info1, info2, address, coordinates, description, fullDesc, authorId, tagIds, visibleName,visibleSurname, visibleEmail, visiblePhone } = body;
    

    const imageUrls = files.map(file => `/images/${file.filename}`);

    const tagIdArray = typeof body.tags === 'string' ? body.tags.split(',') : body.tags || []


    return await this.animalAdService.createAd({
      name,
      gender,
      age,
      address,
      coordinates,
      info1,
      info2,
      description,
      fullDesc,
      authorId,
      imageUrls,
      tagIds: tagIdArray,
      visibleName,
      visibleSurname,
      visibleEmail,
      visiblePhone
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

@Get('by-author/:authorId')
async getAdsByAuthor(@Param('authorId') authorId: string) {
  return await this.animalAdService.getAdsByAuthor(authorId);
}
@Delete(':id')
async deleteAdById(@Param('id') id: string){
  return this.animalAdService.deleteAdById(id)
}

@Put(':id')
@UseInterceptors(FilesInterceptor('images', 5, {
  storage: diskStorage({
    destination: './images',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + extname(file.originalname));
    }
  }),
}))
async updateAd(
  @Param('id') id: string,
  @UploadedFiles() files: Express.Multer.File[],
  @Body() body,
) {
  const {
    name, gender, age, info1, info2, address,
    coordinates, description, fullDesc, tagIds,visibleName,
    visibleSurname,
    visibleEmail,
    visiblePhone
  } = body;

  const existing = body.existingImages
  ? JSON.parse(body.existingImages)
  : []

const imageUrls = [
  ...existing,
  ...files.map(file => `/images/${file.filename}`)
]
  const tagIdArray = typeof body.tags === 'string' ? body.tags.split(',') : body.tags || [];

  return await this.animalAdService.updateAd(id, {
    name,
    gender,
    age,
    info1,
    info2,
    address,
    coordinates,
    description,
    fullDesc,
    tagIds: tagIdArray,
    imageUrls,
    visibleName,
      visibleSurname,
      visibleEmail,
      visiblePhone
  });
}

}
