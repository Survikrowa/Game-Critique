import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RemoveUserGameStatusByUserOauthIdCommand } from './remove_user_game_status_by_user_oauth_id.command';
import { PrismaService } from '../../../database/prisma.service';

@CommandHandler(RemoveUserGameStatusByUserOauthIdCommand)
export class RemoveUserGameStatusByUserOauthIdHandler
  implements ICommandHandler<RemoveUserGameStatusByUserOauthIdCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: RemoveUserGameStatusByUserOauthIdCommand) {
    await this.prismaService.gamesStatus.delete({
      where: {
        oauthId: command.userOauthId,
        id: command.gameStatusId,
      },
    });
  }
}
