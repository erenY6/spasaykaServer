import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Query,
    Req,
    UseGuards,
  } from '@nestjs/common';
  import { DialogueService } from './dialogue.service';
  
  @Controller('dialogue')
  export class DialogueController {
    constructor(private readonly dialogueService: DialogueService) {}
  
    @Get('my/:userId')
    async getUserDialogues(@Param('userId') userId: string) {
      return await this.dialogueService.getUserDialogues(userId);
    }
  
    @Get(':dialogueId/messages')
    async getMessages(@Param('dialogueId') dialogueId: string) {
      return await this.dialogueService.getDialogueMessages(dialogueId);
    }
  
    @Post('create')
    async createDialogue(@Body() body: { user1Id: string; user2Id: string }) {
      return await this.dialogueService.createDialogue(body.user1Id, body.user2Id);
    }
  
    @Post(':dialogueId/send')
    async sendMessage(
      @Param('dialogueId') dialogueId: string,
      @Body() body: { senderId: string; content: string }
    ) {
      return await this.dialogueService.sendMessage(dialogueId, body.senderId, body.content);
    }
  
    @Post(':dialogueId/read')
    async markAsRead(
      @Param('dialogueId') dialogueId: string,
      @Body() body: { readerId: string }
    ) {
      return await this.dialogueService.markMessagesAsRead(dialogueId, body.readerId);
    }
  }
  