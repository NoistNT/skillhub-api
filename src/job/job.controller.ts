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
    return await this.jobService.create(createJobDto);
  }

  @Get()
  async findAll() {
    return await this.jobService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.jobService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return await this.jobService.update(id, updateJobDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.jobService.remove(id);
  }
}
