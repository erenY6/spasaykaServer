"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogueService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let DialogueService = class DialogueService {
    prisma = new client_1.PrismaClient();
    async getUserDialogues(userId) {
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
                    orderBy: { createdAt: 'desc' },
                    take: 1,
                    select: {
                        content: true,
                        createdAt: true,
                        senderId: true,
                    },
                },
            },
            orderBy: { updatedAt: 'desc' },
        });
    }
    async getDialogueMessages(dialogueId) {
        if (!dialogueId)
            throw new Error('dialogueId не передан');
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
            throw new common_1.NotFoundException('Диалог не найден');
        }
        return dialogue.messages;
    }
    async createDialogue(user1Id, user2Id) {
        const existing = await this.prisma.dialogue.findFirst({
            where: {
                OR: [
                    { user1Id, user2Id },
                    { user1Id: user2Id, user2Id: user1Id },
                ],
            },
        });
        if (existing)
            return existing;
        return await this.prisma.dialogue.create({
            data: { user1Id, user2Id },
        });
    }
    async sendMessage(dialogueId, senderId, content) {
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
    async markMessagesAsRead(dialogueId, readerId) {
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
    async getDialogueById(id) {
        return await this.prisma.dialogue.findUnique({
            where: { id },
        });
    }
};
exports.DialogueService = DialogueService;
exports.DialogueService = DialogueService = __decorate([
    (0, common_1.Injectable)()
], DialogueService);
//# sourceMappingURL=dialogue.service.js.map