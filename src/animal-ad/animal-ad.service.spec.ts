/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AnimalAdService } from './animal-ad.service';

describe('AnimalAdService', () => {
  let service: AnimalAdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimalAdService],
    }).compile();

    service = module.get<AnimalAdService>(AnimalAdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
