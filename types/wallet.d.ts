interface EthereumProvider {
    isMetaMask?: boolean;
    request: (request: { method: string; params?: any[] }) => Promise<any>;
    on: (eventName: string, callback: (...args: any[]) => void) => void;
    removeListener: (eventName: string, callback: (...args: any[]) => void) => void;
    selectedAddress: string | undefined;
  }
  
  interface TronWeb {
    ready: boolean;
    defaultAddress: {
      base58: string;
      hex: string;
    };
  }
  
  interface TronLink {
    request: (request: { method: string }) => Promise<any>;
  }
  
  interface Window {
    ethereum?: EthereumProvider;
    tronWeb?: TronWeb;
    tronLink?: TronLink;
  }