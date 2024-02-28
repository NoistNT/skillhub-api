import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from 'src/schemas/job.schema';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { sanitizedString } from '../lib/utils';

@Injectable()
export class JobService {
  constructor(@InjectModel('Job') private readonly jobModel: Model<Job>) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    const title = sanitizedString(createJobDto.title);

    try {
      const existingJob = await this.jobModel.findOne({ title });

      if (existingJob) {
        throw new Error('Job already exists');
      }

      const newJob = new this.jobModel(createJobDto);
      await newJob.save();

      return newJob;
    } catch (error) {
      console.error(error);
      const typedError = error as Error;
      throw new Error(`Failed to create job: ${typedError.message}`);
    }
  }

  async findAll(): Promise<Job[]> {
    try {
      return await this.jobModel.find().select('-__v -createdAt -updatedAt');
    } catch (error) {
      const typedError = error as Error;
      throw new Error(`Failed to retrieve jobs: ${typedError.message}`);
    }
  }

  async findOne(id: string): Promise<Job> {
    try {
      const job = await this.jobModel.findById(id);

      if (!job) {
        throw new Error('Job not found');
      }

      return job;
    } catch (error) {
      const typedError = error as Error;
      throw new Error(`Failed to retrieve job: ${typedError.message}`);
    }
  }

  async update(id: string, updateJobDto: UpdateJobDto): Promise<Job> {
    try {
      const job = await this.jobModel.findByIdAndUpdate(id, updateJobDto);

      if (!job) {
        throw new Error('Job not found');
      }

      return job;
    } catch (error) {
      const typedError = error as Error;
      throw new Error(`Failed to update job: ${typedError.message}`);
    }
  }

  async remove(id: string): Promise<Job> {
    try {
      const removed = await this.jobModel.findByIdAndDelete(id);

      if (!removed) {
        throw new Error('Job not found');
      }

      return removed;
    } catch (error) {
      const typedError = error as Error;
      throw new Error(`Failed to remove job: ${typedError.message}`);
    }
  }
}
