import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from 'src/schemas/job.schema';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { serverError } from 'src/lib/utils/errors';

@Injectable()
export class JobService {
  constructor(@InjectModel('Job') private jobModel: Model<Job>) {}

  async create(createJobDto: CreateJobDto): Promise<{
    status: number;
    message: string;
    data: Job | null;
  }> {
    try {
      const newJob = await new this.jobModel(createJobDto).save();

      if (newJob) {
        return {
          status: 201,
          message: 'Job created successfully',
          data: newJob,
        };
      }
      return {
        status: 404,
        message: 'Job creation failed',
        data: null,
      };
    } catch (error) {
      console.error(error);
      return serverError;
    }
  }

  async findAll(): Promise<{
    status: number;
    message: string;
    data: Array<Job> | null;
  }> {
    try {
      const jobs = await this.jobModel.find().exec();

      if (jobs.length) {
        return {
          status: 200,
          message: 'Jobs retrieved successfully',
          data: jobs,
        };
      }
      return {
        status: 404,
        message: 'Jobs retrieval failed',
        data: null,
      };
    } catch (error) {
      console.error(error);
      return serverError;
    }
  }

  async findOne(id: string): Promise<{
    status: number;
    message: string;
    data: Job | null;
  }> {
    try {
      const job = await this.jobModel.findById(id).exec();

      if (job) {
        return {
          status: 200,
          message: 'Job retrieved successfully',
          data: job,
        };
      }
      return {
        status: 404,
        message: 'Job not found',
        data: null,
      };
    } catch (error) {
      console.error(error);
      return serverError;
    }
  }

  async update(
    id: string,
    updateJobDto: UpdateJobDto,
  ): Promise<{
    status: number;
    message: string;
    data: Job | null;
  }> {
    try {
      const job = await this.jobModel.findByIdAndUpdate(id, updateJobDto);

      if (job) {
        return {
          status: 200,
          message: 'Job updated successfully',
          data: job,
        };
      }
      return {
        status: 404,
        message: 'Job update failed',
        data: null,
      };
    } catch (error) {
      console.error(error);
      return serverError;
    }
  }

  async remove(id: string): Promise<{
    status: number;
    message: string;
    data: Job | null;
  }> {
    try {
      const job = await this.jobModel.findByIdAndDelete(id);

      if (job) {
        return {
          status: 200,
          message: 'Job deleted successfully',
          data: job,
        };
      }
      return {
        status: 404,
        message: 'Job deletion failed',
        data: null,
      };
    } catch (error) {
      console.error(error);
      return serverError;
    }
  }
}
