import tw from 'tailwind-styled-components';
import Widget from '@/components/Widget';
import { defaultCoins } from '@/constants/coins';
import { getCoinCurPrices } from '@/lib/upbit';

export default async function RootPage() {
  const coinInfoList = await getCoinCurPrices(defaultCoins);
  console.log(coinInfoList);

  return (
    <Wrapper>
      <Widget />
      <Widget />
      <Widget />
    </Wrapper>
  );
}
const Wrapper = tw.main`
  px-2 py-6 bg-deep-2
  flex flex-col gap-y-6
`;
