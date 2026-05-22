import { Query } from '@nestjs/cqrs';

export class GetAllJobsQuery extends Query<GetAllJobsQueryResponse[]> {
  constructor() {
    super();
  }
}

type GetAllJobsQueryResponse = {
  id: number;
  url: string;
  jobId: string;
  status: string;
  error: string | null;
  createdAt: Date;
  updatedAt: Date;
};
