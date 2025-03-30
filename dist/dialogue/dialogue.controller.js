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
exports.DialogueController = void 0;
const common_1 = require("@nestjs/common");
const dialogue_service_1 = require("./dialogue.service");
let DialogueController = class DialogueController {
    dialogueService;
    constructor(dialogueService) {
        this.dialogueService = dialogueService;
    }
    async getUserDialogues(userId) {
        return await this.dialogueService.getUserDialogues(userId);
    }
    async getMessages(dialogueId) {
        return await this.dialogueService.getDialogueMessages(dialogueId);
    }
    async createDialogue(body) {
        return await this.dialogueService.createDialogue(body.user1Id, body.user2Id);
    }
    async sendMessage(dialogueId, body) {
        return await this.dialogueService.sendMessage(dialogueId, body.senderId, body.content);
    }
    async markAsRead(dialogueId, body) {
        return await this.dialogueService.markMessagesAsRead(dialogueId, body.readerId);
    }
};
exports.DialogueController = DialogueController;
__decorate([
    (0, common_1.Get)('my/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DialogueController.prototype, "getUserDialogues", null);
__decorate([
    (0, common_1.Get)(':dialogueId/messages'),
    __param(0, (0, common_1.Param)('dialogueId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DialogueController.prototype, "getMessages", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DialogueController.prototype, "createDialogue", null);
__decorate([
    (0, common_1.Post)(':dialogueId/send'),
    __param(0, (0, common_1.Param)('dialogueId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DialogueController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Post)(':dialogueId/read'),
    __param(0, (0, common_1.Param)('dialogueId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DialogueController.prototype, "markAsRead", null);
exports.DialogueController = DialogueController = __decorate([
    (0, common_1.Controller)('dialogue'),
    __metadata("design:paramtypes", [dialogue_service_1.DialogueService])
], DialogueController);
//# sourceMappingURL=dialogue.controller.js.map