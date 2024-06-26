import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, trim: true, lowercase: true })
  firstName!: string;

  @Prop({ required: true, trim: true, lowercase: true })
  lastName!: string;

  @Prop({ required: true, trim: true, unique: true })
  email!: string;

  @Prop({
    required: true,
    default:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  })
  image!: string;

  @Prop({ required: true, default: true })
  isActive!: boolean;

  @Prop({ required: true, default: false })
  isAdmin!: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
