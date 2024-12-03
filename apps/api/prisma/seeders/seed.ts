import { PrismaClient } from '@prisma/client';
import { seedRolesAndPermissions } from './roles_and_permissions/roles_and_permissions';
import { seedUsersParameters } from './users/users';
const prisma = new PrismaClient();

import { parseArgs } from 'node:util';

const options = {
  oauthId: {
    type: 'string',
    description: 'User oauthId',
  },
} as const;

const main = async () => {
  const { values } = parseArgs({ options });
  return prisma.$transaction(async (client) => {
    await seedRolesAndPermissions(client);
    await seedUsersParameters(client, {
      oauthId: String(values.oauthId),
    });
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
