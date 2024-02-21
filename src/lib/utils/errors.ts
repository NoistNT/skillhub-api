import { Job } from 'src/schemas/job.schema';
import { User } from 'src/schemas/user.schema';

export const serverError = {
  status: 500,
  message: 'Internal Server Error',
  data: null as Job | Array<Job> | User | Array<User> | null,
};
