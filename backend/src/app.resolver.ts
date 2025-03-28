import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ChatService } from './chat/services/chat/chat.service';
import { ChatMessageType } from '@/message/models';

@Resolver()
export class AppResolver {
  constructor(private readonly chatService: ChatService) {}

  @Query(() => [ChatMessageType]) 
  async getMessages(): Promise<ChatMessageType[]> {
    const response = await this.chatService.getMessages();
   const res= response.map(({question, response}) => ({
      question,
      response,
    }));
    console.log('dans resolver ', res)
    return  res;
  }
  
  @Query(() => String)
  async askQuestion(@Args('question') question: string): Promise<string> {
    const response = await this.chatService.askQuestion(question);
    return response;
  }
}
