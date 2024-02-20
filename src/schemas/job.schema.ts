import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
// import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Job {
  @Prop({ required: true, trim: true })
  title: string;
  @Prop({ required: true, trim: true })
  location: string;
  @Prop({ required: true, trim: true })
  description: string;
  @Prop({ required: true, trim: true })
  category: string;
  @Prop({ required: true, default: 0 })
  price: number;
  @Prop({
    required: true,
    default: [
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    ],
  })
  image?: [string];
  // @Prop({ required: true, ref: 'User' })
  // user: mongoose.Types.ObjectId;
}

export const JobSchema = SchemaFactory.createForClass(Job);
