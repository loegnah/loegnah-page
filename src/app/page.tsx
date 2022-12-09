import tw from 'tailwind-styled-components';

export default function Home() {
  return <HomeRoot></HomeRoot>;
}
const HomeRoot = tw.main`
  bg-deep-4 flex flex-col px-20
`;
