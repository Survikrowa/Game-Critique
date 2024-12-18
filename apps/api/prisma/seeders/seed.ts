import { PrismaClient } from '@prisma/client';
import { seedRolesAndPermissions } from './roles_and_permissions/roles_and_permissions';
const prisma = new PrismaClient();

const main = async () => {
  return prisma.$transaction(async (client) => {
    await seedRolesAndPermissions(client);
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
