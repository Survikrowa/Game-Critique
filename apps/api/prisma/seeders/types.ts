import { PrismaClient } from '@prisma/client';
import * as runtime from '@prisma/client/runtime/library';

export type OmittedPrismaClient = Omit<PrismaClient, runtime.ITXClientDenyList>;
