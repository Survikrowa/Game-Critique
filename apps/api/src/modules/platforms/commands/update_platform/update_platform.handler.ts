import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  UpdatePlatformCommand,
  UpdatePlatformCommandResponse,
} from './update_platform.command';
import { PrismaService } from '../../../database/prisma.service';

@CommandHandler(UpdatePlatformCommand)
export class UpdatePlatformCommandHandler
  implements ICommandHandler<UpdatePlatformCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    command: UpdatePlatformCommand,
  ): Promise<UpdatePlatformCommandResponse> {
    const { platform } = command;
    const { id, ...rest } = platform;
    return this.prismaService.platform.update({
      where: {
        id,
      },
      data: {
        ...rest,
      },
    });
  }
}
