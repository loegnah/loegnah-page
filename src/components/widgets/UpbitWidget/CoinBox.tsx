import tw from 'tailwind-styled-components';
import type { CoinTradeInfo } from '@/lib/upbit';

type Props = {
  coinInfo: CoinTradeInfo;
};

export default function CoinBox({ coinInfo }: Props) {
  const { market, trade_price, change, change_rate, change_price } = coinInfo;
  return <Wrapper>{`${market.substring(4)}`}</Wrapper>;
}

const Wrapper = tw.div`
  bg-slate-300
`;
