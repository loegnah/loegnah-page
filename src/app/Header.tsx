import tw from 'tailwind-styled-components';
import Link from 'next/link';
import NavBar from '@/components/NavBar';

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
  shadow-md shadow-themeA-shadow
  sticky
`;

const TitleBox = tw(Link)`
  w-30 text-2xl
`;
