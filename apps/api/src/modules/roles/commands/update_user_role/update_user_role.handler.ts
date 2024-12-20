import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserRoleCommand } from './update_user_role.command';
import { PrismaService } from '../../../database/prisma.service';

@CommandHandler(UpdateUserRoleCommand)
export class UpdateUserRoleHandler
  implements ICommandHandler<UpdateUserRoleCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: UpdateUserRoleCommand): Promise<void> {
    await this.prismaService.userRole.update({
      where: {
        oauthId: command.userOauthId,
      },
      data: {
        roleId: command.roleId,
      },
    });
  }
}
