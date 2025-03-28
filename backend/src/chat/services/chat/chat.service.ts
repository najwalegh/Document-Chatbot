import { Injectable } from '@nestjs/common';
import { ChatMessageType } from '@/message/models';
import { ChatProcessingService } from 'src/chatTraitement/services/ChatProcessing.service';
import { MessageRepository } from '@/message/repositories';

@Injectable()
export class ChatService {
  private messages: { content: string; isUser: boolean }[] = [];

  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly chatProcessingService: ChatProcessingService,
  ) {}

  async getMessages(): Promise<ChatMessageType[]> {
    console.log('le rep getMessages est ')

    const responses = await this.messageRepository.findAll();
    console.log('le rep getMessages est ',responses)
    return responses.map(({ question, response }) => ({
      question,
      response,
    }));
  }

  async askQuestion(question: string): Promise<string> {
    try {
      const response = await this.chatProcessingService.processQuestion(question, this.messages);
      const resp=await this.messageRepository.createMessage(question, response);
      console.log('le msg et la rep sont',resp)
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to ask the question');
    }
  }
}
