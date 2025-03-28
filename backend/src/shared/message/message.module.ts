import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageRepository } from './repositories';
import { MessageModel, MessageSchema } from './models';

@Module({
  imports: [MongooseModule.forFeature([{ name: MessageModel.name, schema: MessageSchema }])],
  providers: [MessageRepository],
  exports: [MessageRepository], 
})

export class MessageModule {}