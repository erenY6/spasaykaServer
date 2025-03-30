import { Module } from '@nestjs/common';
import { DialogueController } from './dialogue.controller';
import { DialogueService } from './dialogue.service';
import { DialogueGateway } from './dialogue.gateway'

@Module({
  controllers: [DialogueController],
  providers: [DialogueService, DialogueGateway]
})
export class DialogueModule {}
