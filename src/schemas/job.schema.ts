import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Job {
  @Prop({ required: true, trim: true })
  title: string;
  @Prop({ required: true, trim: true })
  address: string;
  @Prop({ required: true, trim: true })
  description: string;
  @Prop({ required: true, trim: true })
  ability: string;
  @Prop({ required: true })
  price: string;
  @Prop({ required: true })
  image: [string];
  @Prop({ required: true, ref: 'User' })
  users: mongoose.Types.ObjectId;
}

export const JobSchema = SchemaFactory.createForClass(Job);
