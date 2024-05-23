import { sanitizedString } from '@/lib/utils';
import { Job } from '@/schemas/job.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

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
      const err = error as Error;
      throw new Error(`Failed to create job: ${err.message}`);
    }
  }

  async findAll(): Promise<Job[]> {
    try {
      return await this.jobModel.find().select('-__v -createdAt -updatedAt');
    } catch (error) {
      const err = error as Error;
      throw new Error(`Failed to retrieve jobs: ${err.message}`);
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
      const err = error as Error;
      throw new Error(`Failed to retrieve job: ${err.message}`);
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
      const err = error as Error;
      throw new Error(`Failed to update job: ${err.message}`);
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
      const err = error as Error;
      throw new Error(`Failed to remove job: ${err.message}`);
    }
  }
}
