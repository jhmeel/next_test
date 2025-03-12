'use client';
import React from 'react';
import { useWallet } from '@/features/wallet/wallet-context';
import { Button } from '@/components/ui/button';
import { AlertCircle, Check, Wallet } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function WalletStatusBar() {
  const {
    ethereumAccount,
    tronAccount,
    connectMetaMask,
    initTronLink,
    disconnectWallet,
    connectionAttempted
  } = useWallet();

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const hasConnectedWallet = ethereumAccount || tronAccount;

  if (!connectionAttempted) return null;

  if (!hasConnectedWallet) {
    return (
      <Alert className='mx-4 mt-2 border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950'>
        <AlertCircle className='h-4 w-4 text-orange-600 dark:text-orange-400' />
        <AlertDescription className='flex w-full items-center justify-between'>
          <span>Connect a wallet to access all platform features</span>
          <div className='flex gap-2'>
            <Button
              size='sm'
              variant='outline'
              className='border-none bg-orange-500 text-white hover:bg-orange-600'
              onClick={connectMetaMask}
            >
              <Wallet className='mr-2 h-4 w-4' /> MetaMask
            </Button>
            <Button
              size='sm'
              variant='outline'
              className='border-none bg-red-500 text-white hover:bg-red-600'
              onClick={initTronLink}
            >
              <Wallet className='mr-2 h-4 w-4' /> TronLink
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className='mx-4 mt-2 border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950'>
      <Check className='h-4 w-4 text-green-600 dark:text-green-400' />
      <AlertDescription className='flex w-full items-center justify-between'>
        <div>
          {ethereumAccount && (
            <span className='mr-4'>
              MetaMask:{' '}
              <span className='font-medium'>
                {formatAddress(ethereumAccount)}
              </span>
            </span>
          )}
          {tronAccount && (
            <span>
              TronLink:{' '}
              <span className='font-medium'>{formatAddress(tronAccount)}</span>
            </span>
          )}
        </div>
        <Button
          size='sm'
          variant='outline'
          className='border-green-200 text-green-600 hover:border-green-300 dark:border-green-800 dark:hover:border-green-700'
          onClick={disconnectWallet}
        >
          Disconnect
        </Button>
      </AlertDescription>
    </Alert>
  );
}
