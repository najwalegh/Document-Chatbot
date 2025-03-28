import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageModel,MessageDocument } from '../models';

@Injectable()
export class MessageRepository {
  constructor(@InjectModel(MessageModel.name) private readonly messageModel: Model<MessageDocument>) {}

  async createMessage(question: string, response: string): Promise<MessageDocument> {
    const message = { question, response }
    const newMessage = new this.messageModel(message);
    return newMessage.save();
  }

  async findAll(): Promise<MessageDocument[]> {
    return this.messageModel.find().exec();
  }
}
