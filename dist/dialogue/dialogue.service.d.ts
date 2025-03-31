export declare class DialogueService {
    private prisma;
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
            createdAt: Date;
            content: string;
            senderId: string;
        }[];
    } & {
        id: string;
        user1Id: string;
        user2Id: string;
        updatedAt: Date;
    })[]>;
    getDialogueMessages(dialogueId: string): Promise<({
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
    createDialogue(user1Id: string, user2Id: string): Promise<{
        id: string;
        user1Id: string;
        user2Id: string;
        updatedAt: Date;
    }>;
    sendMessage(dialogueId: string, senderId: string, content: string): Promise<{
        id: string;
        createdAt: Date;
        content: string;
        senderId: string;
        dialogueId: string;
        isRead: boolean;
        readAt: Date | null;
    }>;
    markMessagesAsRead(dialogueId: string, readerId: string): Promise<void>;
    getDialogueById(id: string): Promise<{
        id: string;
        user1Id: string;
        user2Id: string;
        updatedAt: Date;
    } | null>;
}
