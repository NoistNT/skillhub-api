import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Invoice {
  @Prop({ required: true })
  plan: string;
  @Prop({ required: true, default: 0 })
  price: number;
  @Prop({ required: true, ref: 'User' })
  user: mongoose.Types.ObjectId;
  @Prop({ required: true })
  status: string;
  @Prop({ required: true })
  purchase_id: string;
  @Prop({ required: true, default: false })
  suscription: boolean;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
