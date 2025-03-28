import { ChatMessageType } from '@/message/models';
import { ChatProcessingService } from 'src/chatTraitement/services/ChatProcessing.service';
import { MessageRepository } from '@/message/repositories';
export declare class ChatService {
    private readonly messageRepository;
    private readonly chatProcessingService;
    private messages;
    constructor(messageRepository: MessageRepository, chatProcessingService: ChatProcessingService);
    getMessages(): Promise<ChatMessageType[]>;
    askQuestion(question: string): Promise<string>;
}
