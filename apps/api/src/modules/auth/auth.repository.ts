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
          role: RoleEnum.USER,
        },
      });
      if (!userRole) {
        throw new Error('Role not found');
      }
      return prisma.user.create({
        data: {
          oauthId,
          role: {
            connect: {
              oauthId,
              roleId: userRole.id,
            },
          },
        },
      });
    });
  }

  async getUserRole(oauthId: string) {
    return this.prismaService.user.findFirst({
      where: {
        oauthId,
      },
      include: {
        role: {
          select: {
            role: true,
          },
        },
      },
    });
  }
}
