import { Command } from '@nestjs/cqrs';
import { DoesItPlayJobStatus } from '@prisma/client';

export class UpdateJobStatusCommand extends Command<UpdateJobStatusCommandResponse> {
  constructor(
    public readonly jobId: string,
    public readonly status: DoesItPlayJobStatus,
    public readonly error?: string,
  ) {
    super();
  }
}

type UpdateJobStatusCommandResponse = {
  id: number;
  url: string;
  jobId: string;
  status: DoesItPlayJobStatus;
  error: string | null;
  createdAt: Date;
  updatedAt: Date;
};
