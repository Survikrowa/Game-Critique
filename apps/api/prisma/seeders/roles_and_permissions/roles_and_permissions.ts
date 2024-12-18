import { RoleEnum } from '@prisma/client';
import { OmittedPrismaClient } from '../types';

export const seedRolesAndPermissions = async (prisma: OmittedPrismaClient) => {
  await prisma.role.createMany({
    data: [{ name: RoleEnum.USER }, { name: RoleEnum.ADMIN }],
  });

  const adminRole = await prisma.role.findFirst({
    where: {
      name: RoleEnum.ADMIN,
    },
  });

  const permission = await prisma.permission.create({
    data: {
      name: 'Enter admin panel',
      permission: 'enter:admin',
    },
  });

  await prisma.permissionRole.create({
    data: {
      roleId: adminRole!.id,
      permissionId: permission.id,
    },
  });
};
