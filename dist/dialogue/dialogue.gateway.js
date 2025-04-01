"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogueGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const dialogue_service_1 = require("./dialogue.service");
let DialogueGateway = class DialogueGateway {
    dialogueService;
    onlineUsers = new Map();
    constructor(dialogueService) {
        this.dialogueService = dialogueService;
    }
    handleConnection(client) {
        const userId = client.handshake.query.userId;
        if (userId) {
            this.onlineUsers.set(userId, client);
        }
    }
    handleDisconnect(client) {
        const userId = [...this.onlineUsers.entries()].find(([, sock]) => sock === client)?.[0];
        if (userId)
            this.onlineUsers.delete(userId);
    }
    async handleSendMessage(payload, client) {
        const message = await this.dialogueService.sendMessage(payload.dialogueId, payload.senderId, payload.content);
        client.broadcast.emit('newMessage', message);
        client.emit('newMessage', message);
        const dialogues = await this.dialogueService.getUserDialogues(payload.senderId);
        client.emit('dialoguesList', dialogues);
        const dialogue = await this.dialogueService.getDialogueById(payload.dialogueId);
        if (!dialogue) {
            console.warn('Диалог не найден');
            return;
        }
        const recipientId = dialogue.user1Id === payload.senderId ? dialogue.user2Id : dialogue.user1Id;
        const recipientSocket = this.onlineUsers.get(recipientId);
        if (recipientSocket) {
            recipientSocket.emit('newMessage', message);
            const dialogues = await this.dialogueService.getUserDialogues(recipientId);
            recipientSocket.emit('dialoguesList', dialogues);
        }
        client.emit('message_sent', message);
    }
    async handleGetDialogues(data, client) {
        const dialogues = await this.dialogueService.getUserDialogues(data.userId);
        client.emit('dialoguesList', dialogues);
    }
    async handleMarkAsRead(payload) {
        await this.dialogueService.markMessagesAsRead(payload.dialogueId, payload.readerId);
        const dialogue = await this.dialogueService.getDialogueById(payload.dialogueId);
        if (!dialogue)
            return;
        const senderId = dialogue.user1Id === payload.readerId ? dialogue.user2Id : dialogue.user1Id;
        const senderSocket = this.onlineUsers.get(senderId);
        if (senderSocket) {
            senderSocket.emit('messageRead', {
                dialogueId: payload.dialogueId,
            });
        }
    }
    async handleGetMessages(data, client) {
        try {
            const messages = await this.dialogueService.getDialogueMessages(data.dialogueId);
            client.emit('messagesList', messages);
        }
        catch (e) {
            console.error('Ошибка при получении сообщений:', e);
            client.emit('messagesList', []);
        }
    }
};
exports.DialogueGateway = DialogueGateway;
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], DialogueGateway.prototype, "handleSendMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getUserDialogues'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], DialogueGateway.prototype, "handleGetDialogues", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('mark_read'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DialogueGateway.prototype, "handleMarkAsRead", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getMessages'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], DialogueGateway.prototype, "handleGetMessages", null);
exports.DialogueGateway = DialogueGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [dialogue_service_1.DialogueService])
], DialogueGateway);
//# sourceMappingURL=dialogue.gateway.js.map