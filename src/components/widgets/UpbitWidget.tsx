import tw from 'tailwind-styled-components';
import Widget from '@/components/widgets/Widget';
import { fetchCoinsPrice } from '@/lib/upbit';
import { defaultCoinNames } from '@/constants/coins';
import BarChart from '@/components/charts/BarChart';

export default async function UpbitWidget() {
  const coinInfos = await fetchCoinsPrice(defaultCoinNames);

  return (
    <Widget className="h-64">
      <Wrapper>
        {coinInfos.map(({ market, trade_price }, idx) => (
          <CoinBox key={idx}>{`${market}: ${trade_price}`}</CoinBox>
        ))}
        <BarChart />
      </Wrapper>
    </Widget>
  );
}

const Wrapper = tw.ul`
  grid grid-cols-4
`;
const CoinBox = tw.li`
`;
