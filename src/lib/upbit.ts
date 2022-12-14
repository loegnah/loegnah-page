type Market = 'KRW' | 'BTC';

function fetchCoinCurPrice(coin: string, market: Market = 'KRW') {
  return fetch(`https://api.upbit.com/v1/ticker?markets=${market}-${coin}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
}

export async function getCoinCurPrices(coins: string[], market: Market = 'KRW') {
  const responses = coins.map((coin) => fetchCoinCurPrice(coin, market));
  return Promise.all(responses.map(async (coinInfoPr) => (await coinInfoPr).json()));
}
