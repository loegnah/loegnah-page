import tw from 'tailwind-styled-components';
import Link from 'next/link';

export default function MainHeader() {
  return (
    <Root>
      <TitleBox href="/">Loegnah Page</TitleBox>
    </Root>
  );
}

const Root = tw.section`
  bg-deep-1 ring-2 ring-deep-4 w-full h-28 flex items-center justify-between
  fixed left-0 px-8
`;

const TitleBox = tw(Link)`
  w-30 text-3xl
`;
