import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Review {
  @Prop({ required: true })
  score!: number;
  @Prop({ required: true })
  message!: string;
}

export const ReviewsSchema = SchemaFactory.createForClass(Review);
