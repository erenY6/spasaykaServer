import { DialogueService } from './dialogue.service';
export declare class DialogueController {
    private readonly dialogueService;
    constructor(dialogueService: DialogueService);
    getUserDialogues(userId: string): Promise<({
        user1: {
            id: string;
            name: string;
            surname: string | null;
            email: string | null;
            phone: string | null;
            password: string;
            avatar: string | null;
        };
        user2: {
            id: string;
            name: string;
            surname: string | null;
            email: string | null;
            phone: string | null;
            password: string;
            avatar: string | null;
        };
        messages: {
            id: string;
            createdAt: Date;
            content: string;
            senderId: string;
            dialogueId: string;
            isRead: boolean;
            readAt: Date | null;
        }[];
    } & {
        id: string;
        user1Id: string;
        user2Id: string;
        updatedAt: Date;
    })[]>;
    getMessages(dialogueId: string): Promise<({
        sender: {
            id: string;
            name: string;
            surname: string | null;
            email: string | null;
            phone: string | null;
            password: string;
            avatar: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        content: string;
        senderId: string;
        dialogueId: string;
        isRead: boolean;
        readAt: Date | null;
    })[]>;
    createDialogue(body: {
        user1Id: string;
        user2Id: string;
    }): Promise<{
        id: string;
        user1Id: string;
        user2Id: string;
        updatedAt: Date;
    }>;
    sendMessage(dialogueId: string, body: {
        senderId: string;
        content: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        content: string;
        senderId: string;
        dialogueId: string;
        isRead: boolean;
        readAt: Date | null;
    }>;
    markAsRead(dialogueId: string, body: {
        readerId: string;
    }): Promise<void>;
}
