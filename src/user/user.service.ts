import { sanitizedString } from '@/lib/utils';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const email = sanitizedString(createUserDto.email);

    try {
      const existingUser = await this.userModel.findOne({ email });

      if (existingUser) throw new Error('Email already registered');

      const newUser = new this.userModel(createUserDto);
      return await newUser.save();
    } catch (error) {
      const err = error as Error;
      throw new Error(`Failed to create user: ${err.message}`);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userModel.find().select('-__v -createdAt -updatedAt');
    } catch (error) {
      const err = error as Error;
      throw new Error(`Failed to retrieve users: ${err.message}`);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id);

      if (!user) throw new Error('User not found');

      return user;
    } catch (error) {
      const err = error as Error;
      throw new Error(`Failed to retrieve user: ${err.message}`);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
        new: true,
      });

      if (!user) throw new Error('User not found');

      return user;
    } catch (error) {
      const err = error as Error;
      throw new Error(`Failed to update user: ${err.message}`);
    }
  }

  async remove(id: string): Promise<User> {
    try {
      const removed = await this.userModel.findByIdAndDelete(id);

      if (!removed) throw new Error('User not found');

      return removed;
    } catch (error) {
      const err = error as Error;
      throw new Error(`Failed to remove user: ${err.message}`);
    }
  }
}
