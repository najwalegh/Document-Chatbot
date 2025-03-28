
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MessageModel {
  @Prop()
  question: string;

  @Prop()
  response: string;
}


@ObjectType()
export class ChatMessageType {
  @Field(() => String)
  question: string;

  @Field(() => String)
  response: string;
}

export type MessageDocument = MessageModel & Document;
export const MessageSchema = SchemaFactory.createForClass(MessageModel);
