import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { getSession } from 'next-auth/client';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    res.status(403).send('Not authorized');
  }
  if (req.method === 'GET') {
    const champions = await prisma.champion.findMany();

    res.json({ pick: champions[Math.floor(Math.random() * champions.length)] });
  }
}
