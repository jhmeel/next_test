import React, { createContext, useContext, useEffect, useState } from 'react';
import { useWalletStore } from '@/stores/wallet-store';

interface WalletContextType {
  ethereumAccount: string | null;
  tronAccount: string | null;
  provider: any;  
  chainId: number | null;
  walletConnected: boolean;
  isConnecting?: boolean;
  connectMetaMask: () => Promise<boolean>;
  initTronLink: () => Promise<boolean>;
  disconnectWallet: () => void;
  checkIfWalletIsConnected: () => Promise<boolean>;
  connectionAttempted: boolean;
}

const WalletContext = createContext<WalletContextType | null>(null);

export function WalletContextProvider({ children }: {
  children: React.ReactNode;
}) {
  const walletStore = useWalletStore();
  const [connectionAttempted, setConnectionAttempted] = useState<boolean>(false);
 
  useEffect(() => {
    const connectOnStartup = async () => {
      try {
        const connected = await walletStore.checkIfWalletIsConnected();
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      } finally {
        setConnectionAttempted(true);
      }
    };
    
    connectOnStartup();
  }, []); 

  return (
    <WalletContext.Provider value={{ ...walletStore, connectionAttempted }}>
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletContextProvider");
  }
  return context;
};