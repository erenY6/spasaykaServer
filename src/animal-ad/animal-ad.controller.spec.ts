import { Test, TestingModule } from '@nestjs/testing';
import { AnimalAdController } from './animal-ad.controller';

describe('AnimalAdController', () => {
  let controller: AnimalAdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimalAdController],
    }).compile();

    controller = module.get<AnimalAdController>(AnimalAdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
