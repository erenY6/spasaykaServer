import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DialogueService {
  private prisma = new PrismaClient();

  async getUserDialogues(userId: string) {
    return await this.prisma.dialogue.findMany({
      where: {
        OR: [
          { user1Id: userId },
          { user2Id: userId },
        ],
      },
      include: {
        user1: true,
        user2: true,
        messages: {
          orderBy: { createdAt: 'asc' },
          take: 1,
        },
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async getDialogueMessages(dialogueId: string) {
    if (!dialogueId) throw new Error('dialogueId не передан')
    const dialogue = await this.prisma.dialogue.findUnique({
      where: { id: dialogueId },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
          include: { sender: true },
        },
      },
    });

    if (!dialogue) {
      throw new NotFoundException('Диалог не найден');
    }

    return dialogue.messages;
  }

  async createDialogue(user1Id: string, user2Id: string) {
    const existing = await this.prisma.dialogue.findFirst({
      where: {
        OR: [
          { user1Id, user2Id },
          { user1Id: user2Id, user2Id: user1Id },
        ],
      },
    });

    if (existing) return existing;

    return await this.prisma.dialogue.create({
      data: { user1Id, user2Id },
    });
  }

  async sendMessage(dialogueId: string, senderId: string, content: string) {
    const message = await this.prisma.message.create({
      data: {
        content,
        senderId,
        dialogueId,
      },
    });

    await this.prisma.dialogue.update({
      where: { id: dialogueId },
      data: { updatedAt: new Date() },
    });

    return message;
  }

  async markMessagesAsRead(dialogueId: string, readerId: string) {
    await this.prisma.message.updateMany({
      where: {
        dialogueId,
        senderId: { not: readerId },
        isRead: false,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });
  }

  async getDialogueById(id: string) {
    return await this.prisma.dialogue.findUnique({
      where: { id },
    })
  }
}
