import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  async create(@Body() createJobDto: CreateJobDto) {
    const job = await this.jobService.create(createJobDto);
    return {
      status: job.status,
      message: job.message,
      data: job.data,
    };
  }

  @Get()
  async findAll() {
    const jobs = await this.jobService.findAll();
    return {
      status: jobs.status,
      message: jobs.message,
      data: jobs.data,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const job = await this.jobService.findOne(id);
    return {
      status: job.status,
      message: job.message,
      data: job.data,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    const job = await this.jobService.update(id, updateJobDto);
    return {
      status: job.status,
      message: job.message,
      data: job.data,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const job = await this.jobService.remove(id);
    return {
      status: job.status,
      message: job.message,
      data: job.data,
    };
  }
}
