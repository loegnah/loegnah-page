'use client';

import tw from 'tailwind-styled-components';
import { useState } from 'react';

export default function Home() {
  const [a, setA] = useState(true);

  return (
    <div className="bg-red-500">
      <Container $aa={a}>hihi</Container>
      <div>hihi</div>
    </div>
  );
}

const Container = tw.div<{ $aa: boolean }>`
  flex bg-slate-500
  ${({ $aa }) => ($aa ? 'text-red-500' : 'text-yellow-500')}
  ${({ $aa }) => ($aa ? 'p-5' : null)}
`;
