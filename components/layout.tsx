import React from 'react';
import 'twin.macro';
import { signOut } from 'next-auth/client';
import Button from '@components/button';

function Header() {
  return (
    <header tw="flex w-full items-center justify-between p-4 border-b border-gray-500">
      <div tw="text-3xl">Fantastig</div>
      <Button
        tw="border border-gray-500 rounded px-6 py-1 bg-gray-800"
        onClick={() => signOut()}
        text="Logout"
      />
    </header>
  );
}

function Footer() {
  return (
    <footer tw="text-sm py-4 flex justify-center">Copyright blabla 2021</footer>
  );
}

export default function Layout({ children }) {
  return (
    <div
      tw="text-gray-300 flex flex-col font-nunito"
      css={`
        background: #262626;
        max-height: fit-content;
        min-height: 100vh;
      `}
    >
      <Header />
      <div tw="flex-grow relative">{children}</div>
      <Footer />
    </div>
  );
}
