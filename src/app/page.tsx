'use client';

import tw from 'tailwind-styled-components';
import { useState } from 'react';

export default function Home() {
  const [a, setA] = useState(true);

  return (
    <HomeRoot>
      <Container $aa={a}>hiahi</Container>
      <div>hihi</div>
    </HomeRoot>
  );
}
const HomeRoot = tw.main`
  bg-red-500
`;

const Container = tw.div<{ $aa: boolean }>`
  flex bg-slate-500
  ${({ $aa }) => ($aa ? 'text-red-500' : 'text-yellow-500')}
  ${({ $aa }) => ($aa ? 'p-5' : null)}
`;
