import { PrismaClient } from '@prisma/client';
import champions from '../public/champions.json';
const prisma = new PrismaClient();

async function main() {
  const dbCalls = champions.map((champ) =>
    prisma.champion.create({
      data: {
        name: champ,
        strength: Math.floor(Math.random() * 20),
        dexterity: Math.floor(Math.random() * 20),
        constitution: Math.floor(Math.random() * 20),
        intelligence: Math.floor(Math.random() * 20),
        wisdom: Math.floor(Math.random() * 20),
        charisma: Math.floor(Math.random() * 20),
      },
    })
  );

  await Promise.allSettled(dbCalls);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
