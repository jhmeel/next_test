
  import React from 'react';
  import {
    Box,
    Text,
    Flex,
    Skeleton,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons';
  
  interface MarketOverviewCardProps {
    title: string;
    value: string;
    changeValue: number;
    changePeriod?: string;
    loading: boolean;
    additionalText?: string;
    additionalTextColor?: string;
  }
  
  const MarketOverviewCard: React.FC<MarketOverviewCardProps> = ({
    title,
    value,
    changeValue,
    changePeriod = '24h',
    loading,
    additionalText,
    additionalTextColor,
  }) => {
    const bg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const textColor = useColorModeValue('gray.500', 'gray.400');
    
    return (
      <Box 
        p={6} 
        borderRadius="xl" 
        boxShadow="sm" 
        bg={bg} 
        borderWidth="1px" 
        borderColor={borderColor}
      >
        <Skeleton isLoaded={!loading}>
          <Text fontSize="sm" fontWeight="medium" color={textColor} mb={1}>
            {title}
          </Text>
          <Text fontSize="2xl" fontWeight="bold">
            {value} 
            {additionalText && (
              <Text as="span" fontSize="lg" fontWeight="medium" color={additionalTextColor}>
                {" "}{additionalText}
              </Text>
            )}
          </Text>
          <Flex alignItems="center" mt={1} color={changeValue >= 0 ? "green.500" : "red.500"}>
            {changeValue >= 0 ? (
              <ArrowUpIcon boxSize={4} mr={1} />
            ) : (
              <ArrowDownIcon boxSize={4} mr={1} />
            )}
            <Text fontSize="sm">
              {changeValue >= 0 ? '+' : ''}{changeValue?.toFixed(1)}% ({changePeriod})
            </Text>
          </Flex>
        </Skeleton>
      </Box>
    );
  };
  
  export default MarketOverviewCard;
  
