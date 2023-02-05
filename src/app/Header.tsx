import tw from 'tailwind-styled-components';
import Link from 'next/link';

export default function Header() {
  const NavList = ['Widget', 'Blog', 'About Me'];
  return (
    <Wrapper>
      <TitleBox href="/">Loegnah Page</TitleBox>
      <NavBox>
        {NavList.map((navName, idx) => (
          <NavBtn key={idx} href={`/${navName.toLowerCase()}`}>
            {navName}
          </NavBtn>
        ))}
      </NavBox>
    </Wrapper>
  );
}

const Wrapper = tw.section`
  flex items-center gap-x-12
  w-full h-20 px-10
  shadow-md shadow-themeA-shadow
  sticky
`;

const TitleBox = tw(Link)`
  w-30 text-3xl select-none
  font-jua
`;

const NavBox = tw.section`
  flex gap-x-8
  text-md font-black_han_sans
`;

const NavBtn = tw(Link)`
  opacity-40 ease-in-out duration-200
  hover:opacity-100 
`;
