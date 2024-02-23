import { PrismaClient } from '@prisma/client'

// we are setting the prisma client if not produiction then it is global
// we declare the prisma global
declare global {
  var prisma: PrismaClient | undefined
}
export const prisma = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma