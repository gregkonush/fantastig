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
    const champions = await prisma.collection.findMany({
      select: { champion: true, id: true },
      where: { user: { email: session?.user.email } },
    });

    res.json({ collection: champions });
  } else if (req.method === 'PUT') {
    const { champion } = JSON.parse(req.body);
    await prisma.collection.create({
      data: {
        user: { connect: { email: session?.user.email } },
        champion: { connect: { name: champion } },
      },
    });

    res.send('OK');
  } else if (req.method === 'DELETE') {
    const { id } = JSON.parse(req.body);
    await prisma.collection.delete({
      where: { id },
    });
    res.send('OK');
  } else {
    throw new Error(`The HTTP ${req.method} method is not supported.`);
  }
}
