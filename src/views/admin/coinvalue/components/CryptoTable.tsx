 import React from 'react';
  import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Box,
    useColorModeValue,
    Skeleton,
    Text,
    Flex,
    Icon
  } from '@chakra-ui/react';
  import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
  import { Cryptocurrency } from '../variables';
  import CryptoTableRow from './CryptoTableRow';
  
  interface CryptoTableProps {
    cryptocurrencies: Cryptocurrency[];
    loading: boolean;
    sortConfig: { key: keyof Cryptocurrency; direction: 'ascending' | 'descending' };
    onRequestSort: (key: keyof Cryptocurrency) => void;
    selectedCrypto: Cryptocurrency | null;
    onSelectCrypto: (crypto: Cryptocurrency) => void;
    favorites: string[];
    onToggleFavorite: (id: string) => void;
  }
  

  const SkeletonRow: React.FC = () => (
    <Tr>
      <Td px={6} py={4}><Skeleton height="24px" width="24px" /></Td>
      <Td px={6} py={4}>
        <Flex alignItems="center">
          <Skeleton height="32px" width="32px" borderRadius="full" />
          <Box ml={4}>
            <Skeleton height="20px" width="120px" mb={2} />
            <Skeleton height="16px" width="40px" />
          </Box>
        </Flex>
      </Td>
      <Td px={6} py={4}><Skeleton height="20px" width="80px" ml="auto" /></Td>
      <Td px={6} py={4}><Skeleton height="20px" width="60px" ml="auto" /></Td>
      <Td px={6} py={4} display={{ base: 'none', md: 'table-cell' }}>
        <Skeleton height="20px" width="80px" ml="auto" />
      </Td>
      <Td px={6} py={4} display={{ base: 'none', lg: 'table-cell' }}>
        <Skeleton height="20px" width="80px" ml="auto" />
      </Td>
      <Td px={6} py={4} display={{ base: 'none', lg: 'table-cell' }}>
        <Skeleton height="40px" width="100px" />
      </Td>
      <Td px={6} py={4}>
        <Flex justifyContent="flex-end">
          <Skeleton height="32px" width="32px" />
        </Flex>
      </Td>
    </Tr>
  );
  
  const CryptoTable: React.FC<CryptoTableProps> = ({
    cryptocurrencies,
    loading,
    sortConfig,
    onRequestSort,
    selectedCrypto,
    onSelectCrypto,
    favorites,
    onToggleFavorite
  }) => {
    const bg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const headerBg = useColorModeValue('gray.50', 'gray.700');
    
   
    const SortableHeader: React.FC<{
      label: string;
      sortKey: keyof Cryptocurrency;
      textAlign?: 'left' | 'right' | 'center';
      display?: object;
    }> = ({ label, sortKey, textAlign = 'left', display }) => {
      const isCurrentSortKey = sortConfig.key === sortKey;
      
      return (
        <Th 
          px={6} 
          py={3} 
          textAlign={textAlign}
          cursor="pointer"
          onClick={() => onRequestSort(sortKey)}
          display={display}
        >
          <Flex 
            alignItems="center" 
            justifyContent={textAlign === 'right' ? 'flex-end' : 'flex-start'}
          >
            <Text>{label}</Text>
            {isCurrentSortKey && (
              <Icon 
                as={sortConfig.direction === 'ascending' ? ChevronUpIcon : ChevronDownIcon} 
                ml={1} 
                boxSize={4} 
              />
            )}
          </Flex>
        </Th>
      );
    };
    
    return (
      <Box 
        overflowX="auto" 
        borderRadius="xl" 
        boxShadow="sm" 
        bg={bg}
        borderWidth="1px"
        borderColor={borderColor}
      >
        <Table variant="simple">
          <Thead bg={headerBg}>
            <Tr>
              <SortableHeader 
                label="#" 
                sortKey="rank" 
              />
              <SortableHeader 
                label="Name" 
                sortKey="name" 
              />
              <SortableHeader 
                label="Price" 
                sortKey="current_price" 
                textAlign="right" 
              />
              <SortableHeader 
                label="24h %" 
                sortKey="price_change_percentage_24h" 
                textAlign="right" 
              />
              <SortableHeader 
                label="Market Cap" 
                sortKey="market_cap" 
                textAlign="right" 
                display={{ base: 'none', md: 'table-cell' }}
              />
              <SortableHeader 
                label="Volume (24h)" 
                sortKey="total_volume" 
                textAlign="right" 
                display={{ base: 'none', lg: 'table-cell' }}
              />
              <Th px={6} py={3} display={{ base: 'none', lg: 'table-cell' }}>Last 7 Days</Th>
              <Th px={6} py={3}></Th>
            </Tr>
          </Thead>
          
          <Tbody>
            {loading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <SkeletonRow key={index} />
              ))
            ) : (
              cryptocurrencies.map((crypto) => (
                <CryptoTableRow 
                  key={crypto.id}
                  crypto={crypto}
                  onSelect={onSelectCrypto}
                  isSelected={selectedCrypto?.id === crypto.id}
                  isFavorited={favorites.includes(crypto.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              ))
            )}
          </Tbody>
        </Table>
      </Box>
    );
  };
  
  export default CryptoTable;
  