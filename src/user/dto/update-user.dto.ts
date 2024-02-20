import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  public firstName: string;
  public lastName: string;
  public email: string;
  public phone: string;
  public image: string;
  public isActive: boolean;
  public isAdmin: boolean;
  public posts: number;
  // public invoices: string;
}
