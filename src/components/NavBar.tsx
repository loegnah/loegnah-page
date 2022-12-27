import tw from 'tailwind-styled-components';

const NavList = ['Widget', 'Blog', 'AboutMe'];

type Props = {};

export default function NavBar({}: Props) {
  return (
    <Wrapper>
      {NavList.map((navName, idx) => (
        <NavBtn key={idx}>{navName}</NavBtn>
      ))}
    </Wrapper>
  );
}

const Wrapper = tw.section`
  flex gap-x-8
  text-sm 
`;

const NavBtn = tw.button`
  opacity-40 ease-in-out duration-200
  hover:opacity-100 
`;
