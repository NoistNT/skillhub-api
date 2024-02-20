import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class TypeJob {
  @Prop({ required: true })
  category: string;
  @Prop({ required: true, ref: 'Job' })
  job: mongoose.Types.ObjectId;
}

export const TypeJobSchema = SchemaFactory.createForClass(TypeJob);
