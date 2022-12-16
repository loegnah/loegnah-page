import tw from 'tailwind-styled-components';
import Widget from '@/components/widgets/Widget';
import { fetchCoinInfos } from '@/lib/upbit';
import { defaultCoinNames } from '@/constants/coins';

export default async function UpbitWidget() {
  const coinInfos = await fetchCoinInfos(defaultCoinNames);

  return (
    <Widget>
      <Wrapper>
        {coinInfos.map(({ market }, idx) => {
          console.log(market);
          return <CoinBox key={idx}>{market}</CoinBox>;
        })}
      </Wrapper>
    </Widget>
  );
}

const Wrapper = tw.ul``;
const CoinBox = tw.li``;
