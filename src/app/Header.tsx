import tw from 'tailwind-styled-components';
import Link from 'next/link';
import NavBar from '@/app/NavBar';

export default function Header() {
  return (
    <Wrapper>
      <TitleBox href="/">Loegnah Page</TitleBox>
      <NavBar />
    </Wrapper>
  );
}

const Wrapper = tw.section`
  flex items-center gap-x-10
  w-full h-20 px-10
  sticky
  bg-deep-1 ring-2 ring-deep-4  
`;

const TitleBox = tw(Link)`
  w-30 text-2xl
`;
