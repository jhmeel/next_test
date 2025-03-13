# CoinValue Page Implementation 

The CoinValue page uses real-time market data from coingecko, coinpaprika and demo data to fallback on if api error. it also implemented analytics and trend and also sentiment indicators like the Fear & Greed Index,

## Features  
- **Live Market Data** – Track prices, market cap, and volume.  
- **Search & Filter** – Easily find cryptocurrencies by name or symbol.  
- **Sorting & Favorites** – Sort coins by price, volume, or market cap and save favorites.  
- **Fear & Greed Index** – Understand market sentiment at a glance.  
- **Refresh & Demo Mode** – Fetch updated data or use fallback demo data when APIs are limited.  


## Installation & Setup  
1. Clone the repository:  
   ```sh
   git clone https://github.com/jhmeel/next_test/tree/feature/coin-value-page.git
 
   ```
2. Install dependencies:  
   ```sh
   npm install
   ```
3. Start the development server:  
   ```sh
   npm run dev
   ```


## Key files created 
src/
├──app/
├   └──admin/
├      └──coin-values
├── views/
│   └── admin/
│       └── coinvalue/
│           ├── components/
│           │   ├── SearchBar.tsx
│           │   ├── CryptoTable.tsx
│           │   ├── MarketOverviewCard.tsx
│           │   └── SparklineChart.tsx
│           └── variables.
└── 