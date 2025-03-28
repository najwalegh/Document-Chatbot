import { ChatService } from './chat/services/chat/chat.service';
import { ChatMessageType } from '@/message/models';
export declare class AppResolver {
    private readonly chatService;
    constructor(chatService: ChatService);
    getMessages(): Promise<ChatMessageType[]>;
    askQuestion(question: string): Promise<string>;
}
