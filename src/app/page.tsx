import tw from 'tailwind-styled-components';
import MainHeader from '../components/mainHeader';

export default function Home() {
  return (
    <HomeRoot>
      <MainHeader />
    </HomeRoot>
  );
}
const HomeRoot = tw.main`
  w-[100vw] h-[100vh] bg-deep-1 flex flex-col px-20
`;
