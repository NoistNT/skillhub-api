import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Payment {
  @Prop({ required: true })
  plan: string;
  @Prop({ required: true, default: 0 })
  price: number;
  @Prop({ required: true, ref: 'User' })
  user: mongoose.Types.ObjectId;
  @Prop({ required: true })
  state: string;
  @Prop({ required: true })
  compra_id: string;
  @Prop({ required: true, default: true })
  subscription: boolean;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
