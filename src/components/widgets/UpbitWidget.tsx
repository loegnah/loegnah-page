import tw from 'tailwind-styled-components';
import Widget from '@/components/widgets/Widget';
import { fetchCoinsPrice } from '@/lib/upbit';
import { defaultCoinNames } from '@/constants/coins';

export default async function UpbitWidget() {
  const coinInfos = await fetchCoinsPrice(defaultCoinNames);

  return (
    <Widget>
      <Wrapper>
        {coinInfos.map(({ market, trade_price }, idx) => {
          return <CoinBox key={idx}>{`${market}: ${trade_price}`}</CoinBox>;
        })}
      </Wrapper>
    </Widget>
  );
}

const Wrapper = tw.ul``;
const CoinBox = tw.li``;
