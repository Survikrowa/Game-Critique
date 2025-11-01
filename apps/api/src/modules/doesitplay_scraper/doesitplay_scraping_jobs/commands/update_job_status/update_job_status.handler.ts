import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateJobStatusCommand } from './update_job_status.command';
import { PrismaService } from '../../../../database/prisma.service';
import { Logger } from '@nestjs/common';

@CommandHandler(UpdateJobStatusCommand)
export class UpdateJobStatusCommandHandler
  implements ICommandHandler<UpdateJobStatusCommand>
{
  private readonly logger = new Logger(UpdateJobStatusCommandHandler.name);

  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: UpdateJobStatusCommand) {
    const { jobId, status, error } = command;
    this.logger.log(`Updating job ${jobId} status to ${status}`);

    return this.prismaService.doesItPlayScrapingJob.update({
      where: { jobId },
      data: {
        status,
        error,
        updatedAt: new Date(),
      },
    });
  }
}
