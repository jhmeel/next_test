import React from 'react';
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  useColorModeValue,
  Box,
  IconButton,
  Text,
  Tooltip
} from '@chakra-ui/react';
import { SearchIcon, RepeatIcon, WarningIcon } from '@chakra-ui/icons';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  timeframe: string;
  onTimeframeChange: (value: string) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  isDemoData: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  timeframe,
  onTimeframeChange,
  onRefresh,
  isRefreshing,
  isDemoData
}) => {
  const bg = useColorModeValue('white', 'gray.800');
  const inputBg = useColorModeValue('gray.100', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  return (
    <Box 
      p={4} 
      borderRadius="xl" 
      boxShadow="sm" 
      bg={bg} 
      mb={4}
      borderWidth="1px"
      borderColor={borderColor}
    >
      <Flex 
        direction={{ base: 'column', md: 'row' }} 
        justify="space-between" 
        alignItems={{ base: 'stretch', md: 'center' }}
      >
        <InputGroup maxW={{ base: '100%', md: '320px' }} mb={{ base: 4, md: 0 }}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input 
            placeholder="Search cryptocurrencies..." 
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            bg={inputBg}
            borderRadius="lg"
          />
        </InputGroup>
        
        <Flex alignItems="center" gap={4}>
          {isDemoData && (
            <Flex alignItems="center" color="orange.500">
              <WarningIcon mr={2} />
              <Text fontSize="sm" display={{ base: 'none', sm: 'block' }}>Using demo data</Text>
            </Flex>
          )}
          
          <Flex alignItems="center">
            <Text mr={2} fontSize="sm" whiteSpace="nowrap">Timeframe:</Text>
            <Select 
              value={timeframe} 
              onChange={(e) => onTimeframeChange(e.target.value)}
              size="sm"
              borderRadius="md"
              width="auto"
            >
              <option value="1h">1h</option>
              <option value="24h">24h</option>
              <option value="7d">7d</option>
              <option value="30d">30d</option>
              <option value="90d">90d</option>
            <option value="1y">1y</option>
          </Select>
        </Flex>
        
        <Tooltip label="Refresh data">
          <IconButton
            aria-label="Refresh data"
            icon={<RepeatIcon />}
            onClick={onRefresh}
            isLoading={isRefreshing}
            variant="ghost"
            size="md"
          />
        </Tooltip>
      </Flex>
    </Flex>
  </Box>
);
};

export default SearchBar;