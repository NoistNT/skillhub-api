import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

const options = { required: true, trim: true };

@Schema({ timestamps: true })
export class Job {
  @Prop(options)
  title!: string;

  @Prop(options)
  description!: string;

  @Prop(options)
  location!: string;

  @Prop(options)
  category!: string;

  @Prop({ required: true })
  wage!: number;

  @Prop({
    required: true,
    trim: true,
    default:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  })
  image!: string;

  @Prop({ required: true, ref: 'User' })
  user_id!: Types.ObjectId;
}

export const JobSchema = SchemaFactory.createForClass(Job);
