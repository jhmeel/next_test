import React from 'react';
import {
  Tr,
  Td,
  Flex,
  Text,
  Image,
  Box,
  useColorModeValue,
  Skeleton,
  IconButton
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { Cryptocurrency, formatCurrency, formatLargeNumber } from '../variables';
import SparklineChart from './SparklineChart';

interface CryptoTableRowProps {
  crypto: Cryptocurrency;
  onSelect: (crypto: Cryptocurrency) => void;
  isSelected: boolean;
  isFavorited?: boolean;
  onToggleFavorite?: (id: string) => void;
}

const CryptoTableRow: React.FC<CryptoTableRowProps> = ({
  crypto,
  onSelect,
  isSelected,
  isFavorited = false,
  onToggleFavorite
}) => {
  const bgHover = useColorModeValue('gray.50', 'gray.700');
  const bgSelected = useColorModeValue('blue.50', 'blue.900');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const subTextColor = useColorModeValue('gray.500', 'gray.400');
  
  return (
    <Tr 
      _hover={{ bg: bgHover }} 
      bg={isSelected ? bgSelected : 'transparent'}
      cursor="pointer"
      onClick={() => onSelect(crypto)}
    >
      <Td px={6} py={4} whiteSpace="nowrap">
        <Text fontWeight="medium">{crypto.rank}</Text>
      </Td>
      
      <Td px={6} py={4} whiteSpace="nowrap">
        <Flex alignItems="center">
          <Image
            boxSize="32px"
            borderRadius="full"
            src={crypto.image}
            alt={crypto.name}
          />
          <Box ml={4}>
            <Text fontWeight="medium" color={textColor}>{crypto.name}</Text>
            <Text fontSize="sm" color={subTextColor}>{crypto.symbol}</Text>
          </Box>
        </Flex>
      </Td>
      
      <Td px={6} py={4} whiteSpace="nowrap" textAlign="right">
        <Text fontWeight="medium">{formatCurrency(crypto.current_price)}</Text>
      </Td>
      
      <Td px={6} py={4} whiteSpace="nowrap" textAlign="right">
        <Text 
          fontWeight="medium" 
          color={crypto.price_change_percentage_24h >= 0 ? "green.500" : "red.500"}
        >
          {crypto.price_change_percentage_24h >= 0 ? '+' : ''}
          {crypto.price_change_percentage_24h.toFixed(2)}%
        </Text>
      </Td>
      
      <Td px={6} py={4} whiteSpace="nowrap" textAlign="right" display={{ base: 'none', md: 'table-cell' }}>
        <Text fontWeight="medium">{formatLargeNumber(crypto.market_cap)}</Text>
      </Td>
      
      <Td px={6} py={4} whiteSpace="nowrap" textAlign="right" display={{ base: 'none', lg: 'table-cell' }}>
        <Text fontWeight="medium">{formatLargeNumber(crypto.total_volume)}</Text>
      </Td>
      
      <Td px={6} py={4} whiteSpace="nowrap" display={{ base: 'none', lg: 'table-cell' }}>
        <SparklineChart data={crypto.sparkline} height="40px" />
      </Td>
      
      <Td px={6} py={4} whiteSpace="nowrap">
        <Flex justifyContent="flex-end" alignItems="center">
          <IconButton
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
            icon={<StarIcon />}
            size="sm"
            variant="ghost"
            color={isFavorited ? "yellow.400" : "gray.400"}
            onClick={(e) => {
              e.stopPropagation();
              if (onToggleFavorite) onToggleFavorite(crypto.id);
            }}
          />
        </Flex>
      </Td>
    </Tr>
  );
};

export default CryptoTableRow;
