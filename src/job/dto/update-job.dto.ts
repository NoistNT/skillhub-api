import { PartialType } from '@nestjs/mapped-types';
import { CreateJobDto } from './create-job.dto';

export class UpdateJobDto extends PartialType(CreateJobDto) {
  public title: string;
  public location: string;
  public description: string;
  public category: string;
  public price: string;
  public image: [string];
}
