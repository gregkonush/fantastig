import React, { FC, useEffect } from 'react';
import Image from 'next/image';
import tw, { css, styled } from 'twin.macro';
import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Button from '@components/button';
import Card from '@components/card';
import { useAnimation } from 'framer-motion';

const aatroxInitial = { x: 300, rotate: -10 };
const ahriInitial = { y: 0, x: 0 };
const sivirInitial = { x: -300, rotate: 10 };

const Index: FC = () => {
  const [session, loading] = useSession();
  const router = useRouter();
  // When rendering client side don't display anything until loading is complete

  useEffect(() => {
    if (session) {
      router.push('/collect');
    }
  }, [session]);

  const controlsAatrox = useAnimation();
  const controlsSivir = useAnimation();
  const controlsAhri = useAnimation();

  const resetToInitial = () => {
    controlsAatrox.start(aatroxInitial);
    controlsAhri.start(ahriInitial);
    controlsSivir.start(sivirInitial);
  };

  return (
    <div
      tw="pt-28 bg-purple-50 h-screen flex flex-col items-center space-y-14 font-nunito"
      css={css`
        background-color: #262626;
      `}
    >
      <div tw="text-6xl font-semibold text-gray-300 uppercase">fantastig</div>
      <div tw="text-2xl font-light text-gray-400">
        Build collection of your favorite characters
      </div>
      <Button text="Start Collecting" onClick={() => signIn('discord')} />

      <div tw="flex space-x-10 pt-10">
        <Card
          text4xl
          champion="aatrox"
          animate={controlsAatrox}
          initial={aatroxInitial}
          whileHover={{ y: -20 }}
          onHoverStart={() => {
            controlsAatrox.start({ x: 350, rotate: 0, y: -10 });
            controlsAhri.start({ x: 300 });
            controlsSivir.start({ x: -30, rotate: 0 });
          }}
          onHoverEnd={resetToInitial}
        />
        <Card
          text4xl
          champion="ahri"
          animate={controlsAhri}
          whileHover={{ y: -20 }}
          onHoverStart={() => {
            controlsAatrox.start({ x: 100 });
            controlsSivir.start({ x: -100 });
          }}
          onHoverEnd={resetToInitial}
        />
        <Card
          text4xl
          champion="sivir"
          animate={controlsSivir}
          whileHover={{ y: -20 }}
          initial={sivirInitial}
          onHoverStart={() => {
            controlsAatrox.start({ rotate: 0, x: 350 });
            controlsSivir.start({ rotate: 0, y: -10, x: -350 });
          }}
          onHoverEnd={resetToInitial}
        />
      </div>
    </div>
  );
};

export default Index;
