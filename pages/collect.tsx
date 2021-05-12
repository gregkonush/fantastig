import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Layout from '@components/layout';
import Card from '@components/card';
import Button from '@components/button';
import 'twin.macro';
import { useAnimation } from 'framer-motion';

export default function Collect() {
  const [roll, setRoll] = useState({ name: '' });
  const [session, loading] = useSession();
  const [collection, setCollection] = useState([]);
  const router = useRouter();
  const cardControls = useAnimation();

  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, [session]);

  useEffect(() => {
    cardControls.set({ opacity: 0 });
    cardControls.start({
      scale: [1, 1.01, 1.01, 1, 1],
      rotateY: [0, 180, 720, 360, 0],
      x: 0,
      backgroundColor: '#212121',
      opacity: 1,
      transition: { duration: 1 },
    });
  }, [roll?.name]);

  useEffect(() => {
    const fetchCollection = async () => {
      const { collection } = await (await fetch('/api/collections')).json();
      setCollection(collection);
    };
    fetchCollection();
  }, [collection.length]);

  const handleDelete = async (id) => {
    await fetch('/api/collections', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    setCollection(collection.filter(({ id: removeId }) => removeId !== id));
  };

  if (loading) return <div>loading</div>;

  return (
    <Layout>
      <div tw="flex p-10 space-x-1 items-center justify-center">
        {roll?.name ? (
          <Card
            champion={roll?.name}
            animate={cardControls}
            initial={{ x: -100 }}
            handleAdd={async () => {
              await fetch('/api/collections', {
                method: 'PUT',
                body: JSON.stringify({ champion: roll?.name }),
              });
              setCollection([
                ...collection,
                { champion: { name: roll?.name } },
              ]);
              setRoll({ name: '' });
            }}
          />
        ) : (
          <Card animate={cardControls} empty />
        )}
      </div>
      <div tw="w-full flex justify-center my-4">
        <Button
          text="Roll"
          tw="px-16 rounded-lg"
          onClick={async () => {
            const response = await (await fetch('/api/roll')).json();
            setRoll(response.pick);
          }}
        />
      </div>
      <hr tw="border-gray-700" />
      <div tw="p-4">
        <h2 tw="text-lg font-bold">Your collection:</h2>
        <div tw="flex flex-wrap space-x-2 space-y-2">
          {collection.map(({ id, champion: { name } }, index) => (
            <Card
              champion={name}
              key={index}
              size="small"
              deletable
              handleDelete={() => handleDelete(id)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
