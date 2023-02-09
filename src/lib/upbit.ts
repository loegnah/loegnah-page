type Market = 'KRW' | 'BTC';

type CoinTradeInfo = {
  market: string;
  trade_date: string;
  trade_time: string;
  trade_date_kst: string;
  trade_time_kst: string;
  trade_price: number;
  change: 'EVEN' | 'RISE' | 'FALL';
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

export async function fetchCoinPrice(
  coin: string,
  market: Market = 'KRW'
): Promise<[CoinTradeInfo]> {
  return fetchData(`https://api.upbit.com/v1/ticker?markets=${market}-${coin}`);
}

export async function fetchCoinsPrice(
  coinNames: string[],
  market: Market = 'KRW'
): Promise<CoinTradeInfo[]> {
  const markets = coinNames.map((coinName) => `${market}-${coinName}`).join(', ');
  return fetchData(`https://api.upbit.com/v1/ticker?markets=${markets}`);
}

export async function fetchAllCoinNames(): Promise<CoinNameInfo[]> {
  return fetchData(`https://api.upbit.com/v1/market/all`, {
    next: { revalidate: 60 * 60 * 24 },
  });
}
