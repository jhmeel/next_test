import axios from  'axios'
export interface Cryptocurrency {
    id: string;
    name: string;
    symbol: string;
    current_price: number;
    price_change_percentage_24h: number;
    market_cap: number;
    total_volume: number;
    image: string;
    sparkline: number[];
    rank: number;
  }
  
  export interface GlobalMarketData {
    total_market_cap: {
      usd: number;
    };
    total_volume: {
      usd: number;
    };
    market_cap_percentage: {
      btc: number;
    };
    market_cap_change_percentage_24h_usd: number;
    volume_change_percentage_24h_usd: number;
  }
  
  export interface FearGreedIndex {
    value: string;
    value_classification: string;
    timestamp: string;
    time_until_update: string;
  }
  

  export const mockCryptocurrencies: Cryptocurrency[] = [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      current_price: 88546.21,
      price_change_percentage_24h: 2.45,
      market_cap: 1089432156734,
      total_volume: 46582134987,
      image: '/api/placeholder/32/32',
      sparkline: [56432, 57102, 57843, 57321, 56999, 57543, 58432],
      rank: 1
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      current_price: 3012.54,
      price_change_percentage_24h: -1.23,
      market_cap: 362145798321,
      total_volume: 16987452167,
      image: '/api/placeholder/32/32',
      sparkline: [3050, 3022, 2998, 3015, 3029, 3005, 3012],
      rank: 2
    },
    {
      id: 'binancecoin',
      name: 'Binance Coin',
      symbol: 'BNB',
      current_price: 512.87,
      price_change_percentage_24h: 0.75,
      market_cap: 79874521673,
      total_volume: 2154786932,
      image: '/api/placeholder/32/32',
      sparkline: [509, 510, 507, 513, 516, 511, 512],
      rank: 3
    },
    {
      id: 'solana',
      name: 'Solana',
      symbol: 'SOL',
      current_price: 142.33,
      price_change_percentage_24h: 5.67,
      market_cap: 61245678432,
      total_volume: 5671234567,
      image: '/api/placeholder/32/32',
      sparkline: [134, 136, 138, 140, 139, 141, 142],
      rank: 4
    },
    {
      id: 'cardano',
      name: 'Cardano',
      symbol: 'ADA',
      current_price: 0.56,
      price_change_percentage_24h: -0.32,
      market_cap: 19675432198,
      total_volume: 987654321,
      image: '/api/placeholder/32/32',
      sparkline: [0.57, 0.56, 0.55, 0.56, 0.57, 0.56, 0.56],
      rank: 5
    },
    {
      id: 'xrp',
      name: 'XRP',
      symbol: 'XRP',
      current_price: 0.62,
      price_change_percentage_24h: 1.54,
      market_cap: 32564789123,
      total_volume: 1456789012,
      image: '/api/placeholder/32/32',
      sparkline: [0.60, 0.61, 0.62, 0.61, 0.62, 0.63, 0.62],
      rank: 6
    },
    {
      id: 'polkadot',
      name: 'Polkadot',
      symbol: 'DOT',
      current_price: 6.98,
      price_change_percentage_24h: -2.13,
      market_cap: 8712345678,
      total_volume: 654321987,
      image: '/api/placeholder/32/32',
      sparkline: [7.10, 7.05, 7.01, 6.99, 6.95, 6.97, 6.98],
      rank: 7
    },
    {
      id: 'dogecoin',
      name: 'Dogecoin',
      symbol: 'DOGE',
      current_price: 0.12,
      price_change_percentage_24h: 8.76,
      market_cap: 15987654321,
      total_volume: 3456789012,
      image: '/api/placeholder/32/32',
      sparkline: [0.11, 0.11, 0.12, 0.12, 0.13, 0.12, 0.12],
      rank: 8
    },
    {
      id: 'avalanche',
      name: 'Avalanche',
      symbol: 'AVAX',
      current_price: 33.45,
      price_change_percentage_24h: 4.21,
      market_cap: 11234567890,
      total_volume: 1098765432,
      image: '/api/placeholder/32/32',
      sparkline: [32.10, 32.45, 32.90, 33.12, 33.30, 33.40, 33.45],
      rank: 9
    },
    {
      id: 'chainlink',
      name: 'Chainlink',
      symbol: 'LINK',
      current_price: 17.89,
      price_change_percentage_24h: 3.45,
      market_cap: 9876543210,
      total_volume: 876543210,
      image: '/api/placeholder/32/32',
      sparkline: [17.30, 17.45, 17.60, 17.70, 17.85, 17.80, 17.89],
      rank: 10
    }
  ];
  
  export const mockGlobalMarketData: GlobalMarketData = {
    total_market_cap: { usd: 2140000000000 },
    total_volume: { usd: 128700000000 },
    market_cap_percentage: { btc: 48.2 },
    market_cap_change_percentage_24h_usd: 2.4,
    volume_change_percentage_24h_usd: -3.8
  };
  
  export const mockFearGreedIndex: FearGreedIndex = {
    value: "75",
    value_classification: "Greed",
    timestamp: Date.now().toString(),
    time_until_update: "0"
  };
  

  export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: value >= 1 ? 2 : 6
    }).format(value);
  };
  
  export const formatLargeNumber = (value: number): string => {
    if (value >= 1e12) return `${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K`;
    return value.toString();
  };
  


  
  export const fetchLiveMarketData = async (): Promise<Cryptocurrency[]> => {
    try {
    
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 10,
          page: 1,
          sparkline: true,
          price_change_percentage: '24h'
        }
      });
  
      return response?.data?.map((coin: any, index: number) => ({
        id: coin.id,
        name: coin.name,
        symbol: coin?.symbol?.toUpperCase(),
        current_price: coin.current_price,
        price_change_percentage_24h: coin.price_change_percentage_24h,
        market_cap: coin.market_cap,
        total_volume: coin.total_volume,
        image: coin.image || '/api/placeholder/32/32',
        sparkline: coin.sparkline_in_7d?.price?.slice(-7) || Array(7).fill(coin.current_price),
        rank: index + 1
      }));
    } catch (error) {
      console.error('Error fetching from CoinGecko API:', error);
      // If API fails, try Coinpaprika API as backup
      try {
        const tickers = await axios.get('https://api.coinpaprika.com/v1/tickers');
        const top10 = tickers.data.slice(0, 10);
        
        return top10.map((coin: any, index: number) => ({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          current_price: coin.quotes.USD.price,
          price_change_percentage_24h: coin.quotes.USD.percent_change_24h,
          market_cap: coin.quotes.USD.market_cap,
          total_volume: coin.quotes.USD.volume_24h,
          image: `/api/placeholder/32/32`, // Coinpaprika doesn't provide images in this endpoint
          sparkline: Array(7).fill(coin.quotes.USD.price), // Placeholder sparkline data
          rank: index + 1
        }));
      } catch (secondError) {
        console.error('Error fetching from backup API:', secondError);
        // Both APIs failed, return mock data
        return mockCryptocurrencies;
      }
    }
  };
  
  export const fetchGlobalMarketData = async (): Promise<GlobalMarketData> => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/global');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching global market data:', error);
      // Return mock data if API fails
      return mockGlobalMarketData;
    }
  };
  
  export const fetchFearGreedIndex = async (): Promise<FearGreedIndex> => {
    try {
      const response = await axios.get('https://api.alternative.me/fng/');
      return response.data.data[0];
    } catch (error) {
      console.error('Error fetching fear & greed index:', error);
      // Return mock data if API fails
      return mockFearGreedIndex;
    }
  };
  