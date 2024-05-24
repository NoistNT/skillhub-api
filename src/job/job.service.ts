import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './entities/job.entity';

@Injectable()
export class JobService {
  constructor(@InjectModel(Job.name) private readonly jobModel: Model<Job>) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    try {
      const newJob = new this.jobModel(createJobDto);
      return await newJob.save();
    } catch (error) {
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
      const job = await this.jobModel
        .findById(id)
        .select('-__v -createdAt -updatedAt')
        .populate('user_id');

      if (!job) throw new Error('Job not found');

      return job;
    } catch (error) {
      const err = error as Error;
      throw new Error(`Failed to retrieve job: ${err.message}`);
    }
  }

  async update(id: string, updateJobDto: UpdateJobDto): Promise<Job> {
    try {
      const job = await this.jobModel.findByIdAndUpdate(id, updateJobDto, {
        new: true,
      });

      if (!job) throw new Error('Job not found');

      return job;
    } catch (error) {
      const err = error as Error;
      throw new Error(`Failed to update job: ${err.message}`);
    }
  }

  async remove(id: string): Promise<Job> {
    try {
      const removed = await this.jobModel.findByIdAndDelete(id);

      if (!removed) throw new Error('Job not found');

      return removed;
    } catch (error) {
      const err = error as Error;
      throw new Error(`Failed to remove job: ${err.message}`);
    }
  }
}
