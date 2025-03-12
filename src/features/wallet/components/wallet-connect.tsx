import { useEffect, useState } from 'react';
import { useWalletStore } from '@/stores/wallet-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function WalletConnect() {
  const { 
    ethereumAccount, 
    tronAccount, 
    connectMetaMask, 
    initTronLink, 
    disconnectWallet,
    walletConnected,
    checkIfWalletIsConnected
  } = useWalletStore();
  
  const [connectionAttempted, setConnectionAttempted] = useState(false);

  useEffect(() => {
    const connectOnStartup = async () => {
      const connected = await checkIfWalletIsConnected();
      setConnectionAttempted(true);
    };

    connectOnStartup();
  }, [checkIfWalletIsConnected]);

  const formatAddress = (address: string | null): string => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wallet Connector</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">MetaMask:</span>
            {ethereumAccount ? (
              <div className="flex items-center space-x-2">
                <span className="text-green-600">{formatAddress(ethereumAccount)}</span>
              </div>
            ) : (
              <div>
                {!connectionAttempted || (typeof window !== 'undefined' && window.ethereum) ? (
                  <Button 
                    onClick={() => connectMetaMask()}
                    variant="outline"
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Connect
                  </Button>
                ) : (
                  <span className="text-red-500">Not installed</span>
                )}
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <span className="font-medium">TronLink:</span>
            {tronAccount ? (
              <div className="flex items-center space-x-2">
                <span className="text-green-600">{formatAddress(tronAccount)}</span>
              </div>
            ) : (
              <div>
                {!connectionAttempted || (typeof window !== 'undefined' && (window.tronWeb || window.tronLink)) ? (
                  <Button 
                    onClick={() => initTronLink()}
                    variant="outline"
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    Connect
                  </Button>
                ) : (
                  <span className="text-red-500">Not installed</span>
                )}
              </div>
            )}
          </div>
          
          {(ethereumAccount || tronAccount) && (
            <div className="pt-2">
              <Button
                onClick={() => disconnectWallet()}
                variant="outline"
                className="w-full"
              >
                Disconnect Wallets
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}