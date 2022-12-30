import tw from 'tailwind-styled-components';
import type { CoinTradeInfo } from '@/lib/upbit';

type Props = {
  coinInfo: CoinTradeInfo;
  size: 0 | 1 | 2 | 3;
};

export default function CoinBox({ coinInfo, size }: Props) {
  const { market, trade_price, change, change_rate, change_price } = coinInfo;
  return <Wrapper $size={size}>{`${market.substring(4)}`}</Wrapper>;
}

const spanBySize: { [key in Props['size']]: string } = {
  0: 'row-span-1 col-span-1 text-sm',
  1: 'row-span-2 col-span-2 text-xl',
  2: 'row-span-3 col-span-3 text-3xl',
  3: 'row-span-4 col-span-4 text-5xl',
};

const Wrapper = tw.div<{ $size: Props['size'] }>`
  flex justify-center items-center
  ${({ $size }) => spanBySize[$size]}
`;
