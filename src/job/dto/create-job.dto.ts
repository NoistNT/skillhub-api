import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateJobDto {
  @IsString()
  @Length(5, 50)
  title!: string;

  @IsString()
  @Length(10, 500)
  description!: string;

  @IsString()
  @Length(5, 50)
  category!: string;

  @IsString()
  @Length(5, 80)
  location!: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  wage!: number;

  @IsUrl()
  @IsString()
  @IsOptional()
  image!: string;

  @IsOptional()
  user_id!: Types.ObjectId;
}
