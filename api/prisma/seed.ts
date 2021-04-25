import { PrismaClient, UserRole } from '@prisma/client'
const prisma = new PrismaClient()

/**
 * Seed initial admin user
 */
async function main(): Promise<void> {
  await prisma.user.upsert({
    where: { email: 'admin@campfarfelu.fr' },
    update: {},
    create: {
      email: `admin@campfarfelu.fr`,
      name: 'Paulin Trognon',
      passwordHash: '$2a$08$RxWSV4cHq5ODn5O8Abh4L.1axkWPMa1Uh8jMT/Fgptn/5wMddmPqi',
      role: UserRole.ADMIN,
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
