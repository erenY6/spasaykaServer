import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { DialogueService } from './dialogue.service';
export declare class DialogueGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly dialogueService;
    private onlineUsers;
    constructor(dialogueService: DialogueService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleSendMessage(payload: {
        dialogueId: string;
        senderId: string;
        content: string;
    }, client: Socket): Promise<void>;
    handleGetDialogues(data: {
        userId: string;
    }, client: Socket): Promise<void>;
    handleMarkAsRead(payload: {
        dialogueId: string;
        readerId: string;
    }): Promise<void>;
    handleGetMessages(data: {
        dialogueId: string;
    }, client: Socket): Promise<void>;
}
