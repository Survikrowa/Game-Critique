import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { AuthRepositoryPort } from '../../domain/ports/auth.repository.port';
import { AuthUser, UserRole } from '../../domain/models/auth-user.model';
import { RoleEnum } from '@prisma/client';

@Injectable()
export class PrismaAuthRepository implements AuthRepositoryPort {
  constructor(private readonly prismaService: PrismaService) {}

  async save(user: AuthUser): Promise<AuthUser> {
    const roleName =
      user.role === UserRole.ADMIN ? RoleEnum.ADMIN : RoleEnum.USER;

    const saved = await this.prismaService.$transaction(async (prisma) => {
      const userRole = await prisma.role.findFirst({
        where: { name: roleName },
      });

      if (!userRole) {
        throw new Error('Role not found');
      }

      const newUser = await prisma.user.create({
        data: {
          oauthId: user.oauthId,
          role: {
            connectOrCreate: {
              where: {
                oauthId: user.oauthId,
              },
              create: {
                roleId: userRole.id,
              },
            },
          },
        },
      });
      return { ...newUser, roleName: userRole.name };
    });

    const role =
      saved.roleName === RoleEnum.ADMIN ? UserRole.ADMIN : UserRole.USER;
    return new AuthUser({ oauthId: saved.oauthId, role }, saved.id);
  }

  async findUserByOauthId(oauthId: string): Promise<AuthUser | null> {
    const user = await this.prismaService.user.findUnique({
      where: { oauthId },
      include: { role: { include: { role: true } } },
    });

    if (!user || !user.role) return null;

    const roleName = user.role.role.name;
    const role = roleName === RoleEnum.ADMIN ? UserRole.ADMIN : UserRole.USER;
    return new AuthUser({ oauthId: user.oauthId, role }, user.id);
  }
}
