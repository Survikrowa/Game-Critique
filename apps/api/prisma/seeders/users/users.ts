import { RoleEnum } from '@prisma/client';
import { OmittedPrismaClient } from '../types';

type SeedUserParametersArgs = {
  oauthId: string;
};

export const seedUsersParameters = async (
  prisma: OmittedPrismaClient,
  { oauthId }: SeedUserParametersArgs,
) => {
  const adminRole = await prisma.role.findFirst({
    where: {
      role: RoleEnum.ADMIN,
    },
  });

  const userRole = await prisma.userRole.create({
    data: {
      roleId: adminRole!.id,
      oauthId,
    },
  });
  await prisma.user.update({
    where: {
      oauthId,
    },
    data: {
      role: {
        connect: {
          oauthId: userRole.oauthId,
          roleId: userRole.roleId,
        },
      },
    },
  });
};
