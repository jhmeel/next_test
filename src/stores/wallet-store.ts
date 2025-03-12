import { create } from 'zustand';
import { ethers } from 'ethers';

interface WalletState {
    ethereumAccount: string | null;
    tronAccount: string | null;
    provider: ethers.providers.Web3Provider | null;
    chainId: number | null;
    walletConnected: boolean;
    isConnecting: boolean;
    connectMetaMask: () => Promise<boolean>;
    initTronLink: () => Promise<boolean>;
    disconnectWallet: () => void;
    checkIfWalletIsConnected: () => Promise<boolean>;
  }
  
  export const useWalletStore = create<WalletState>((set, get) => ({
    ethereumAccount: null,
    tronAccount: null,
    provider: null,
    chainId: null,
    walletConnected: false,
    isConnecting: false,
  
    connectMetaMask: async () => {
      try {
        set({ isConnecting: true });
        
        if (typeof window === "undefined" || !window.ethereum) {
          console.error("MetaMask not installed");
          return false;
        }
  
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const network = await provider.getNetwork();
        
        set({
          provider,
          chainId: network.chainId,
          ethereumAccount: accounts[0],
          walletConnected: true
        });
  
        // Account listeners
        window.ethereum.on("accountsChanged", (accounts: string[]) => {
          if (accounts.length > 0) {
            set({ ethereumAccount: accounts[0] });
          } else {
            // MetaMask was disconnected or locked
            set({
              ethereumAccount: null,
              walletConnected: !!get().tronAccount
            });
          }
        });
  
        window.ethereum.on("chainChanged", (chainId: string) => {
          set({ chainId: parseInt(chainId, 16) });
        });
  
    
        window.ethereum.on("disconnect", () => {
          set({
            ethereumAccount: null,
            walletConnected: !!get().tronAccount
          });
        });
  
        return true;
      } catch (error) {
        console.error("MetaMask connection error:", error);
        return false;
      } finally {
        set({ isConnecting: false });
      }
    },
  
    initTronLink: async () => {
      try {
        set({ isConnecting: true });
        
        if (typeof window === "undefined") return false;
        
        // Check if TronWeb is already initialized and ready
        if (window.tronWeb && window.tronWeb.ready) {
          const tronAddress = window.tronWeb.defaultAddress.base58;
          set({
            tronAccount: tronAddress,
            walletConnected: true
          });
          return true;
        }
  
        // If TronLink exists but TronWeb isn't ready, request account access
        if (window.tronLink) {
          try {
            await window.tronLink.request({ method: 'tron_requestAccounts' });
            
            let attempts = 0;
            const maxAttempts = 10;
            
            while (attempts < maxAttempts) {
              if (window.tronWeb && window.tronWeb.ready) {
                const tronAddress = window.tronWeb.defaultAddress.base58;
                set({
                  tronAccount: tronAddress,
                  walletConnected: true
                });
                return true;
              }
              
              await new Promise(resolve => setTimeout(resolve, 200));
              attempts++;
            }
            
            console.error("TronWeb not ready after multiple attempts");
          } catch (error) {
            console.error("TronLink connection error:", error);
          }
        }
        
        return false;
      } catch (error) {
        console.error("TronLink general error:", error);
        return false;
      } finally {
        set({ isConnecting: false });
      }
    },
  
    disconnectWallet: () => {
    
      set({
        ethereumAccount: null,
        tronAccount: null,
        provider: null,
        walletConnected: false
      });
    },
  
    checkIfWalletIsConnected: async () => {
      try {
        set({ isConnecting: true });
        
        let connected = false;
        
        // Check MetaMask first (without prompting)
        if (typeof window !== "undefined" && window.ethereum) {
          try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const accounts = await provider.listAccounts();
            
            if (accounts.length > 0) {
              const network = await provider.getNetwork();
              set({
                provider,
                ethereumAccount: accounts[0],
                chainId: network.chainId,
                walletConnected: true
              });
              connected = true;
              
              // Set up listeners
              window.ethereum.on("accountsChanged", (accounts: string[]) => {
                if (accounts.length > 0) {
                  set({ ethereumAccount: accounts[0] });
                } else {
                  set({
                    ethereumAccount: null,
                    walletConnected: !!get().tronAccount
                  });
                }
              });
              
              window.ethereum.on("chainChanged", (chainId: string) => {
                set({ chainId: parseInt(chainId, 16) });
              });
            }
          } catch (error) {
            console.error("Silent MetaMask check error:", error);
          }
        }
        
        // Check TronLink (without prompting)
        if (typeof window !== "undefined" && window.tronWeb && window.tronWeb.ready) {
          try {
            const tronAddress = window.tronWeb.defaultAddress.base58;
            if (tronAddress) {
              set({
                tronAccount: tronAddress,
                walletConnected: true
              });
              connected = true;
            }
          } catch (error) {
            console.error("Silent TronLink check error:", error);
          }
        }
        
        return connected;
      } finally {
        set({ isConnecting: false });
      }
    }
  }));
  