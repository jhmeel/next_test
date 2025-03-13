import React from 'react';
import {
  Box,
  Flex,
  Text,
  Image,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Button,
  IconButton,
  useColorModeValue,
  Link
} from '@chakra-ui/react';
import { StarIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import {formatCurrency, formatLargeNumber, Cryptocurrency } from '../variables';
import SparklineChart from './SparklineChart';

interface CryptoDetailPanelProps {
  crypto: Cryptocurrency;
  timeframe: string;
  isFavorited: boolean;
  onToggleFavorite: () => void;
}

const CryptoDetailPanel: React.FC<CryptoDetailPanelProps> = ({
  crypto,
  timeframe,
  isFavorited,
  onToggleFavorite
}) => {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const subTextColor = useColorModeValue('gray.500', 'gray.400');
  
  return (
    <Box 
      p={6} 
      borderRadius="xl" 
      boxShadow="sm" 
      bg={bg}
      borderWidth="1px"
      borderColor={borderColor}
      height="100%"
    >
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Flex alignItems="center">
          <Image
            boxSize="48px"
            borderRadius="full"
            src={crypto.image}
            alt={crypto.name}
            mr={4}
          />
          <Box>
            <Text fontSize="2xl" fontWeight="bold" color={textColor}>
              {crypto.name}
            </Text>
            <Text fontSize="md" color={subTextColor}>
              {crypto.symbol}
            </Text>
          </Box>
        </Flex>
        
        <Flex alignItems="center">
          <IconButton
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
            icon={<StarIcon />}
            size="md"
            variant="ghost"
            color={isFavorited ? "yellow.400" : "gray.400"}
            onClick={onToggleFavorite}
            mr={2}
          />
          <Link href={`https://www.coingecko.com/en/coins/${crypto.id}`} isExternal>
            <IconButton
              aria-label="View on CoinGecko"
              icon={<ExternalLinkIcon />}
              size="md"
              variant="ghost"
            />
          </Link>
        </Flex>
      </Flex>
      
      <Flex direction="column" mb={6}>
        <Text fontSize="3xl" fontWeight="bold" mb={1}>
          {formatCurrency(crypto.current_price)}
        </Text>
        <Flex alignItems="center">
          <StatArrow 
            type={crypto.price_change_percentage_24h >= 0 ? 'increase' : 'decrease'} 
          />
          <Text
            fontSize="md"
            fontWeight="medium"
            color={crypto.price_change_percentage_24h >= 0 ? "green.500" : "red.500"}
          >
            {crypto.price_change_percentage_24h >= 0 ? '+' : ''}
            {crypto.price_change_percentage_24h.toFixed(2)}%
          </Text>
          <Text fontSize="sm" color={subTextColor} ml={1}>
            (24h)
          </Text>
        </Flex>
      </Flex>
      
      <Box mb={6}>
        <Text fontSize="md" fontWeight="medium" mb={2}>
          Price Chart ({timeframe})
        </Text>
        <Box height="150px">
          <SparklineChart 
            data={crypto.sparkline} 
            height="150px"
            color={crypto.price_change_percentage_24h >= 0 ? "green.500" : "red.500"}
          />
        </Box>
      </Box>
      
      <Divider mb={6} />
      
      <Flex direction="column" gap={4}>
        <Stat>
          <StatLabel>Market Cap Rank</StatLabel>
          <StatNumber>#{crypto.rank}</StatNumber>
        </Stat>
        
        <Stat>
          <StatLabel>Market Cap</StatLabel>
          <StatNumber>{formatLargeNumber(crypto.market_cap)}</StatNumber>
        </Stat>
        
        <Stat>
          <StatLabel>24h Trading Volume</StatLabel>
          <StatNumber>{formatLargeNumber(crypto.total_volume)}</StatNumber>
          <StatHelpText>
            Volume/Market Cap: {(crypto.total_volume / crypto.market_cap).toFixed(4)}
          </StatHelpText>
        </Stat>
      </Flex>
      
      <Divider my={6} />
      
      <Button colorScheme="blue" width="100%">
        Trade {crypto.symbol}
      </Button>
    </Box>
  );
};

export default CryptoDetailPanel;

