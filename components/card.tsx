import React, { FC } from 'react';
import Image from 'next/image';
import { HTMLMotionProps, motion } from 'framer-motion';
import tw, { styled } from 'twin.macro';
import Button from '@components/button';

const Title = styled.div(({ text4xl }: { text4xl: boolean }) => [
  tw`text-gray-200 absolute font-semibold`,
  tw`font-parisienne flex capitalize bottom-2`,
  tw`text-2xl bg-purple-800 bg-opacity-40 px-4`,
  text4xl && tw`text-4xl`,
]);

const sizes = {
  small: {
    width: 150,
    height: 271,
  },
  large: {
    width: 308,
    height: 559,
  },
};

const Card: FC<
  {
    champion?: string;
    size?: string;
    text4xl?: boolean;
    empty?: boolean;
    deletable?: boolean;
    handleAdd?: () => {};
    handleDelete?: () => {};
  } & HTMLMotionProps<'div'>
> = ({
  champion,
  size = 'large',
  text4xl = false,
  empty = false,
  deletable = false,
  handleAdd,
  handleDelete,
  ...rest
}) => {
  const { width, height } = sizes[size];
  return (
    <motion.div
      tw="relative cursor-pointer p-4 rounded-2xl overflow-hidden border border-gray-700 shadow-xl flex flex-col justify-center"
      css={`
        width: ${width}px;
        height: ${height}px;
      `}
      {...rest}
    >
      {empty ? (
        <div tw="text-gray-300 text-lg">
          Click Roll button to get new card for your collection
        </div>
      ) : (
        <Image
          priority
          src={`https://raw.communitydragon.org/latest/game/assets/characters/${champion.toLowerCase()}/skins/base/${champion.toLowerCase()}loadscreen.png`}
          layout="fill"
          objectFit="scale-down"
          objectPosition="50% 50%"
          quality={90}
        />
      )}
      <Title text4xl={text4xl}>{champion}</Title>
      {handleAdd && (
        <Button
          tw="absolute bottom-2 -right-2 text-green-300 font-bold bg-transparent py-1 hover:bg-transparent "
          onClick={handleAdd}
          text="Add"
        />
      )}
      {deletable && (
        <Button
          text="X"
          tw="absolute top-1 right-1 text-red-700 font-black text-lg bg-white bg-opacity-5 py-1 px-2 hover:bg-gray-200"
          onClick={handleDelete}
        />
      )}
    </motion.div>
  );
};

export default Card;
