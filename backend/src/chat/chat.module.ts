import { MessageRepository } from '@/message/repositories';
import { MessageModule } from '@/message/message.module';
import {  MessageModel, MessageSchema } from '@/message/models';
import { Module } from '@nestjs/common';
import { ChatService } from './services/chat/chat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { chatTraitementModule } from 'src/chatTraitement/chatTraitement.module';
@Module({
  imports: [chatTraitementModule,MessageModule,MongooseModule.forFeature([{ name: MessageModel.name, schema: MessageSchema }])],
  providers: [ChatService],
  exports:[ChatService]
})
export class ChatModule {}
