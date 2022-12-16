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

function fetchCoinPrice(coin: string, market: Market = 'KRW') {
  return fetch(`https://api.upbit.com/v1/ticker?markets=${market}-${coin}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    next: { revalidate: 300 },
  });
}

export async function fetchCoinInfos(
  coinNames: string[],
  market: Market = 'KRW'
): Promise<CoinInfo[]> {
  const responses = coinNames.map((coinName) => fetchCoinPrice(coinName, market));
  return Promise.all(responses.map(async (response) => (await response).json()));
}
