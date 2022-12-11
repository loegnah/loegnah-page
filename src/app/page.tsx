import tw from 'tailwind-styled-components';
import HomeWidget from '../components/homeWidget';

export default function Home() {
  return (
    <HomeRoot>
      <HomeWidget />
      <HomeWidget />
      <HomeWidget />
    </HomeRoot>
  );
}
const HomeRoot = tw.main`
  px-2 py-6 bg-deep-2
  flex flex-col gap-y-6
`;
