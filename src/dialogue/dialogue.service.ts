import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DialogueService {
  private prisma = new PrismaClient();

  async getUserDialogues(userId: string) {
    const dialogues = await this.prisma.dialogue.findMany({
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
          orderBy: { createdAt: 'desc' },
          take: 1,
          select: {
            content: true,
            createdAt: true,
            senderId: true,
            isRead: true,
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    })
  
    // Подсчёт непрочитанных сообщений для каждого диалога
    const dialoguesWithUnread = await Promise.all(
      dialogues.map(async (dialogue) => {
        const unreadCount = await this.prisma.message.count({
          where: {
            dialogueId: dialogue.id,
            senderId: { not: userId },
            isRead: false,
          },
        })
  
        return {
          ...dialogue,
          unreadCount,
        }
      }),
    )
  
    return dialoguesWithUnread
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
