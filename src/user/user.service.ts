import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { serverError } from 'src/lib/utils/errors';

export interface IUserResponse {
  status: number;
  message: string;
  data: User | Array<User>;
}
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<IUserResponse> {
    try {
      const existingUser = await this.userModel.findOne({
        email: createUserDto.email.trim(),
      });

      if (existingUser) {
        return {
          status: 409,
          message: 'A user with the same email already exists',
          data: null,
        };
      }

      const newUser = await new this.userModel(createUserDto).save();

      if (newUser) {
        return {
          status: 201,
          message: 'User created successfully',
          data: newUser,
        };
      }
      return {
        status: 404,
        message: 'User creation failed',
        data: null,
      };
    } catch (error) {
      console.error(error);
      return serverError as IUserResponse;
    }
  }

  async findAll(): Promise<IUserResponse> {
    try {
      const users = await this.userModel.find().exec();

      if (users.length) {
        return {
          status: 200,
          message: 'Users retrieved successfully',
          data: users,
        };
      }
      return {
        status: 404,
        message: 'Users retrieval failed',
        data: null,
      };
    } catch (error) {
      console.error(error);
      return serverError as IUserResponse;
    }
  }

  async findOne(id: string): Promise<IUserResponse> {
    try {
      const user = await this.userModel.findById(id).exec();

      if (user) {
        return {
          status: 200,
          message: 'User retrieved successfully',
          data: user,
        };
      }
      return {
        status: 404,
        message: 'User not found',
        data: null,
      };
    } catch (error) {
      console.error(error);
      return serverError as IUserResponse;
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<IUserResponse> {
    try {
      const user = await this.userModel.findByIdAndUpdate(id, updateUserDto);

      if (user) {
        return {
          status: 200,
          message: 'User updated successfully',
          data: user,
        };
      }
      return {
        status: 404,
        message: 'User update failed',
        data: null,
      };
    } catch (error) {
      console.error(error);
      return serverError as IUserResponse;
    }
  }

  async remove(id: string): Promise<IUserResponse> {
    try {
      const user = await this.userModel.findByIdAndDelete(id);

      if (user) {
        return {
          status: 200,
          message: 'User deleted successfully',
          data: user,
        };
      }
      return {
        status: 404,
        message: 'User deletion failed',
        data: null,
      };
    } catch (error) {
      console.error(error);
      return serverError as IUserResponse;
    }
  }
}
