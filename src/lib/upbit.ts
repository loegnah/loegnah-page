import _ from 'lodash';
import { defaultCoinNames } from '@/constants/coins';

type Market = 'KRW' | 'BTC';

export type CoinTradeInfo = {
  market: string;
  trade_date: string;
  trade_time: string;
  trade_date_kst: string;
  trade_time_kst: string;
  trade_price: number;
  prev_closing_price: number;
  change: 'EVEN' | 'RISE' | 'FALL';
  change_price: number;
  change_rate: number;
  change_level: 0 | 1 | 2 | 3;
};

type CoinNameInfo = {
  market: string;
  korean_name: string;
  english_name: string;
};

async function fetchData(
  URL: string,
  option?: { cache?: RequestCache; next?: NextFetchRequestConfig }
) {
  const res = await fetch(URL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    cache: option?.cache || 'force-cache',
    next: option?.next || { revalidate: false },
  });
  return await res.json();
}

function checkChangeLevel({ change_rate }: CoinTradeInfo): CoinTradeInfo['change_level'] {
  if (change_rate < 0.01) return 0;
  if (change_rate <= 0.03) return 1;
  if (change_rate <= 0.06) return 2;
  return 3;
}

export async function fetchCoinsPrice(
  coinNames: string[],
  market: Market = 'KRW'
): Promise<CoinTradeInfo[]> {
  const markets = coinNames.map((coinName) => `${market}-${coinName}`).join(', ');
  const coinInfos = (await fetchData(
    `https://api.upbit.com/v1/ticker?markets=${markets}`
  )) as CoinTradeInfo[];

  return coinInfos.map((ci) => ({
    ...ci,
    change_level: checkChangeLevel(ci),
  }));
}

export async function fetchSortedCoinsPrice(coinNames: string[], market: Market = 'KRW') {
  const coinInfos = await fetchCoinsPrice(defaultCoinNames);
  return _.sortBy(coinInfos, (ci) => ci.change_rate * (ci.change === 'FALL' ? 1 : -1));
}

export async function fetchAllCoinNames(): Promise<CoinNameInfo[]> {
  return fetchData(`https://api.upbit.com/v1/market/all`, {
    next: { revalidate: 60 * 60 * 24 },
  });
}
