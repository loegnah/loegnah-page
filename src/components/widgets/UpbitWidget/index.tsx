import tw from 'tailwind-styled-components';
import Widget from '@/components/widgets/Widget';
import { fetchCoinsPrice } from '@/lib/upbit';
import { defaultCoinNames } from '@/constants/coins';
import CoinBox from '@/components/widgets/UpbitWidget/CoinBox';

export default async function UpbitWidget() {
  const coinInfos = await fetchCoinsPrice(defaultCoinNames);

  return (
    <Widget>
      <Wrapper>
        {coinInfos.map((coinInfo, idx) => (
          <CoinBox coinInfo={coinInfo} size={(idx % 4) as any} order={idx} key={idx} />
        ))}
      </Wrapper>
    </Widget>
  );
}

const Wrapper = tw.div`
  grid grid-cols-8 grid-rows-8 gap-2 grid-flow-dense
  h-96
  font-bold
`;
