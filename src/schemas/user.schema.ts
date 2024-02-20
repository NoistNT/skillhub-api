import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, index: true })
  uid: string;
  @Prop({ required: true, trim: true })
  firstName: string;
  @Prop({ required: true, trim: true })
  lastName: string;
  @Prop({ required: true, trim: true, unique: true })
  email: string;
  @Prop({ required: true })
  phoneNumber: string;
  @Prop({ required: true, default: true })
  habilitar: boolean;
  @Prop({ required: true })
  image: string;
  @Prop({ required: true, ref: 'Payment' })
  pay: mongoose.Types.ObjectId;
  @Prop({ required: true, default: 0 })
  cantidadPost: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
