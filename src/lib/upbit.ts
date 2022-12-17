type Market = 'KRW' | 'BTC';

export type CoinInfo = {
  market: string;
  trade_date: string;
  trade_time: string;
  trade_date_kst: string;
  trade_time_kst: string;
  trade_price: number;
  change: 'EVEN' | 'RISE' | 'FALL';
};

async function fetchData(URL: string) {
  const res = await fetch(URL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    next: { revalidate: 300 },
  });
  return await res.json();
}

export async function fetchCoinPrice(coin: string, market: Market = 'KRW'): Promise<[CoinInfo]> {
  return fetchData(`https://api.upbit.com/v1/ticker?markets=${market}-${coin}`);
}

export async function fetchCoinsPrice(
  coinNames: string[],
  market: Market = 'KRW'
): Promise<CoinInfo[]> {
  const markets = coinNames.map((coinName) => `${market}-${coinName}`).join(', ');
  console.log(markets);
  return fetchData(`https://api.upbit.com/v1/ticker?markets=${markets}`);
}
