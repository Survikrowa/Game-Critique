import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create_user.command';
import { RoleEnum } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: CreateUserCommand) {
    const { id, role } = await this.createUser(command.oauthId);
    return {
      id,
      role,
    };
  }

  async createUser(oauthId: string) {
    return this.prismaService.$transaction(async (prisma) => {
      const userRole = await prisma.role.findFirst({
        where: {
          name: RoleEnum.USER,
        },
      });
      if (!userRole) {
        throw new Error('Role not found');
      }
      const user = await prisma.user.create({
        data: {
          oauthId,
          role: {
            connectOrCreate: {
              where: {
                oauthId,
              },
              create: {
                roleId: userRole.id,
              },
            },
          },
        },
      });
      return {
        ...user,
        role: userRole.name,
      };
    });
  }
}
