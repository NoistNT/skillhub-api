import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
// import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, trim: true })
  firstName: string;
  @Prop({ required: true, trim: true })
  lastName: string;
  @Prop({ required: true, trim: true, unique: true })
  email: string;
  @Prop({ required: true })
  phone: string;
  @Prop({
    required: true,
    default:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  })
  image?: string;
  @Prop({ required: true, default: true })
  isActive: boolean;
  @Prop({ required: true, default: false })
  isAdmin: boolean;
  @Prop({ required: true, default: 0 })
  posts: number;
  // @Prop({ required: true, ref: 'Invoice' })
  // invoices: mongoose.Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
