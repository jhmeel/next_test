"use client"
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Box,
  Container,
  Grid,
  GridItem,
  SimpleGrid,
  Text,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import { 
  fetchLiveMarketData, 
  fetchGlobalMarketData, 
  fetchFearGreedIndex ,
  Cryptocurrency,
  GlobalMarketData,
  FearGreedIndex, formatCurrency, formatLargeNumber } from 'views/admin/coinvalue/variables';
import SearchBar from 'views/admin/coinvalue/components/SearchBar';
import MarketOverviewCard from 'views/admin/coinvalue/components/MarketOverviewCard';
import CryptoTable from 'views/admin/coinvalue/components/CryptoTable';
import CryptoDetailsPanel from 'views/admin/coinvalue/components/CryptoDetailsPanel';

const CoinValues: React.FC = () => {

  const [cryptocurrencies, setCryptocurrencies] = useState<Cryptocurrency[]>([]);
  const [globalMarketData, setGlobalMarketData] = useState<GlobalMarketData | null>(null);
  const [fearGreedIndex, setFearGreedIndex] = useState<FearGreedIndex | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isDemoData, setIsDemoData] = useState<boolean>(false);
  
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [timeframe, setTimeframe] = useState<string>('24h');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Cryptocurrency;
    direction: 'ascending' | 'descending';
  }>({
    key: 'market_cap',
    direction: 'descending'
  });
  const [selectedCrypto, setSelectedCrypto] = useState<Cryptocurrency | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const toast = useToast();
 
  useEffect(() => {
    const savedFavorites = localStorage.getItem('cryptoFavorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Failed to parse favorites from localStorage', error);
      }
    }
  }, []);
  

  useEffect(() => {
    localStorage.setItem('cryptoFavorites', JSON.stringify(favorites));
  }, [favorites]);
  

  useEffect(() => {
    fetchData();
  }, []);
  
  
  const fetchData = async () => {
    setLoading(true);
    setIsDemoData(false);
    
    try {
      
      const [cryptoData, marketData, fgIndex] = await Promise.all([
        fetchLiveMarketData(),
        fetchGlobalMarketData(),
        fetchFearGreedIndex()
      ]);
      
      setCryptocurrencies(cryptoData);
      setGlobalMarketData(marketData);
      setFearGreedIndex(fgIndex);
      

      if (cryptoData[0].id === 'bitcoin' && cryptoData[0].current_price === 88546.21) {
        setIsDemoData(true);
        toast({
          title: 'Using demo data',
          description: 'API rate limits reached. Displaying demo data instead.',
          status: 'info',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: 'Error loading data',
        description: 'Failed to fetch cryptocurrency data. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setIsDemoData(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchData().finally(() => {
      setIsRefreshing(false);
      toast({
        title: 'Data refreshed',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    });
  };
  

  const handleRequestSort = (key: keyof Cryptocurrency) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
      // If we're already sorting by this key in descending order,
      // switch back to market cap descending as the default
      key = 'market_cap';
      direction = 'descending';
    }
    
    setSortConfig({ key, direction });
  };
  
  // to toggle favorites
  const handleToggleFavorite = useCallback((id: string) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(id)) {
        return prevFavorites.filter(favId => favId !== id);
      } else {
        return [...prevFavorites, id];
      }
    });
  }, []);
  
  const filteredAndSortedCryptocurrencies = useMemo(() => {
    // Filter by search term
    let result = cryptocurrencies;
    
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        crypto => 
          crypto.name.toLowerCase().includes(lowerSearchTerm) || 
          crypto.symbol.toLowerCase().includes(lowerSearchTerm)
      );
    }
    
    // Sort based on current sort config
    result = [...result].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    
    return result;
  }, [cryptocurrencies, searchTerm, sortConfig]);
  
 
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  
  const getFearGreedColor = () => {
    if (!fearGreedIndex) return 'gray.500';
    
    const value = parseInt(fearGreedIndex.value);
    if (value >= 75) return 'green.500';
    if (value >= 50) return 'green.400';
    if (value >= 25) return 'orange.400';
    return 'red.500';
  };
  
  const getFearGreedText = () => {
    if (!fearGreedIndex) return '';
    return fearGreedIndex.value_classification;
  };
  
  return (
    <Box minH="100vh" bg={bgColor} py={8}>
      <Container maxW="container.xl">
        <Text fontSize="3xl" fontWeight="bold" mb={6}>
          Coin Values
        </Text>
        
        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          timeframe={timeframe}
          onTimeframeChange={setTimeframe}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
          isDemoData={isDemoData}
        />
        
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={6}>
          <MarketOverviewCard
            title="Global Market Cap"
            value={globalMarketData ? formatLargeNumber(globalMarketData.total_market_cap.usd) : "--"}
            changeValue={globalMarketData ? globalMarketData.market_cap_change_percentage_24h_usd : 0}
            loading={loading}
          />
          
          <MarketOverviewCard
            title="24h Trading Volume"
            value={globalMarketData ? formatLargeNumber(globalMarketData.total_volume.usd) : "--"}
            changeValue={globalMarketData ? globalMarketData.volume_change_percentage_24h_usd : 0}
            loading={loading}
          />
          
          <MarketOverviewCard
            title="Fear & Greed Index"
            value={fearGreedIndex ? fearGreedIndex.value : "--"}
            changeValue={0} 
            loading={loading}
            additionalText={getFearGreedText()}
            additionalTextColor={getFearGreedColor()}
          />
        </SimpleGrid>
        
        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
          <GridItem>
            <CryptoTable
              cryptocurrencies={filteredAndSortedCryptocurrencies}
              loading={loading}
              sortConfig={sortConfig}
              onRequestSort={handleRequestSort}
              selectedCrypto={selectedCrypto}
              onSelectCrypto={setSelectedCrypto}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          </GridItem>
          
          {selectedCrypto && (
            <GridItem>
              <CryptoDetailsPanel 
                crypto={selectedCrypto}
                timeframe={timeframe}
                isFavorited={favorites.includes(selectedCrypto.id)}
                onToggleFavorite={() => handleToggleFavorite(selectedCrypto.id)}
              />
            </GridItem>
          )}
        </Grid>
      </Container>
    </Box>
  );
};


export default CoinValues