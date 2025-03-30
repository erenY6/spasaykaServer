import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimalAdService } from './animal-ad/animal-ad.service';
import { AnimalAdController } from './animal-ad/animal-ad.controller';
import { AnimalAdModule } from './animal-ad/animal-ad.module';
import { AuthModule } from './auth/auth.module';
import { DialogueModule } from './dialogue/dialogue.module';

@Module({
  imports: [AnimalAdModule, AuthModule, DialogueModule],
  controllers: [AppController, AnimalAdController],
  providers: [AppService, AnimalAdService],
})
export class AppModule {}

