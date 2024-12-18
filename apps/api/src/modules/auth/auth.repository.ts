import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { RoleEnum } from '@prisma/client';

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

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

  async getUserRole(oauthId: string) {
    return this.prismaService.userRole.findFirst({
      where: {
        oauthId,
      },
      include: {
        role: {
          select: {
            name: true,
          },
        },
      },
    });
  }
}
