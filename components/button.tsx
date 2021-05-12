import React, { FC } from 'react';
import 'twin.macro';

const Button: FC<{ text: string; onClick: () => {} }> = ({ text, onClick, ...rest }) => (
  <button
    tw="transition duration-500 ease-in-out bg-purple-800 text-gray-50 font-semibold py-3 px-6 rounded hover:bg-purple-600"
    onClick={onClick}
    {...rest}
  >
    {text}
  </button>
);

export default Button;
