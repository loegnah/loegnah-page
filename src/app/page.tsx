import tw from 'tailwind-styled-components';
import UpbitWidget from '@/components/widgets/UpbitWidget';

export default async function RootPage() {
  return <Wrapper></Wrapper>;
}
const Wrapper = tw.main`
  px-2 py-6 bg-deep-2
  flex flex-col gap-y-6
`;
