import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Administrador {
  @Prop({ required: true, unique: true, index: true })
  uid: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  surname: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  phone: number;
  @Prop({ required: true })
  admin: boolean;
}

export const AdministradorSchema = SchemaFactory.createForClass(Administrador);
