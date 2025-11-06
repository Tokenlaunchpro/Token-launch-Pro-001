import { ethers } from 'ethers';
import QRCode from 'qrcode';
import { supabase } from './supabase.js';

export class WalletIntegration {
  constructor() {
    this.provider = null;
    this.signer = null;
    this.userWallet = null;
    this.supportedNetworks = {
      ethereum: {
        chainId: '0x1',
        name: 'Ethereum Mainnet',
        symbol: 'ETH',
        rpcUrl: 'https://mainnet.infura.io/v3/your-key',
        explorerUrl: 'https://etherscan.io'
      },
      bsc: {
        chainId: '0x38',
        name: 'Binance Smart Chain',
        symbol: 'BNB',
        rpcUrl: 'https://bsc-dataseed.binance.org',
        explorerUrl: 'https://bscscan.com'
      },
      polygon: {
        chainId: '0x89',
        name: 'Polygon',
        symbol: 'MATIC',
        rpcUrl: 'https://polygon-rpc.com',
        explorerUrl: 'https://polygonscan.com'
      }
    };
  }

  // Generate new wallet for user
  async generateWallet() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Generate new wallet
      const wallet = ethers.Wallet.createRandom();
      
      // Encrypt private key (in production, use proper encryption)
      const encryptedPrivateKey = await this.encryptPrivateKey(wallet.privateKey, user.id);
      
      // Save wallet to database
      const { error } = await supabase
        .from('user_wallets')
        .insert({
          user_id: user.id,
          wallet_address: wallet.address,
          encrypted_private_key: encryptedPrivateKey,
          wallet_type: 'generated',
          is_active: true
        });

      if (error) throw error;

      this.userWallet = {
        address: wallet.address,
        privateKey: wallet.privateKey
      };

      return {
        success: true,
        address: wallet.address,
        qrCode: await this.generateQRCode(wallet.address)
      };
    } catch (error) {
      console.error('Wallet generation failed:', error);
      throw error;
    }
  }

  // Connect external wallet (MetaMask, WalletConnect)
  async connectWallet() {
    try {
      if (typeof window.ethereum !== 'undefined') {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        this.provider = new ethers.BrowserProvider(window.ethereum);
        this.signer = this.provider.getSigner();
        
        const address = await this.signer.getAddress();
        const network = await this.provider.getNetwork();
        
        // Save connected wallet
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase
            .from('user_wallets')
            .upsert({
              user_id: user.id,
              wallet_address: address,
              wallet_type: 'connected',
              network_id: network.chainId,
              is_active: true
            });
        }

        return {
          success: true,
          address,
          network: network.name,
          chainId: network.chainId
        };
      } else {
        throw new Error('MetaMask not installed');
      }
    } catch (error) {
      console.error('Wallet connection failed:', error);
      throw error;
    }
  }

  // Get user's wallets
  async getUserWallets() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('user_wallets')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_active', true);

    if (error) throw error;
    return data || [];
  }

  // Generate QR code for wallet address
  async generateQRCode(address) {
    try {
      const qrCodeDataURL = await QRCode.toDataURL(address, {
        width: 256,
        margin: 2,
        color: {
          dark: '#6b1aff',
          light: '#ffffff'
        }
      });
      return qrCodeDataURL;
    } catch (error) {
      console.error('QR code generation failed:', error);
      return null;
    }
  }

  // Get wallet balance
  async getWalletBalance(address, network = 'ethereum') {
    try {
      const networkConfig = this.supportedNetworks[network];
      const provider = new ethers.JsonRpcProvider(networkConfig.rpcUrl);
      
      const balance = await provider.getBalance(address);
      const formattedBalance = ethers.formatEther(balance);
      
      return {
        balance: formattedBalance,
        symbol: networkConfig.symbol,
        network: networkConfig.name
      };
    } catch (error) {
      console.error('Balance fetch failed:', error);
      return { balance: '0', symbol: 'ETH', network: 'Unknown' };
    }
  }

  // Auto-detect network
  async detectNetwork() {
    try {
      if (window.ethereum) {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        
        for (const [key, network] of Object.entries(this.supportedNetworks)) {
          if (network.chainId === chainId) {
            return {
              detected: true,
              network: key,
              name: network.name,
              symbol: network.symbol
            };
          }
        }
      }
      
      return { detected: false, network: 'unknown' };
    } catch (error) {
      console.error('Network detection failed:', error);
      return { detected: false, network: 'unknown' };
    }
  }

  // Switch network
  async switchNetwork(networkKey) {
    try {
      const network = this.supportedNetworks[networkKey];
      if (!network) throw new Error('Unsupported network');

      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: network.chainId }]
      });

      return { success: true, network: network.name };
    } catch (error) {
      console.error('Network switch failed:', error);
      throw error;
    }
  }

  // Encrypt private key (simplified - use proper encryption in production)
  async encryptPrivateKey(privateKey, userId) {
    // In production, use proper encryption with user-specific salt
    const encoder = new TextEncoder();
    const data = encoder.encode(privateKey + userId);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Create wallet dashboard component
  createWalletDashboard(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="wallet-dashboard bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-2xl">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            My Wallets
          </h2>
          <div class="flex space-x-4">
            <button onclick="walletIntegration.generateWallet()" 
                    class="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              Generate Wallet
            </button>
            <button onclick="walletIntegration.connectWallet()" 
                    class="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              Connect Wallet
            </button>
          </div>
        </div>
        
        <div id="walletsList" class="grid md:grid-cols-2 gap-6">
          <div class="wallet-placeholder text-center py-12 text-gray-400">
            <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
            <p class="text-lg">No wallets connected</p>
            <p class="text-sm">Generate or connect a wallet to get started</p>
          </div>
        </div>
      </div>
    `;

    this.loadUserWallets();
  }

  // Load and display user wallets
  async loadUserWallets() {
    try {
      const wallets = await this.getUserWallets();
      const walletsList = document.getElementById('walletsList');
      
      if (wallets.length === 0) return;

      walletsList.innerHTML = wallets.map(wallet => `
        <div class="wallet-card bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600 hover:border-purple-500 transition-all duration-300">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-xl font-semibold text-white mb-2">
                ${wallet.wallet_type === 'generated' ? '🔐 Generated Wallet' : '🔗 Connected Wallet'}
              </h3>
              <p class="text-gray-400 text-sm font-mono">${wallet.wallet_address}</p>
            </div>
            <div class="qr-code w-16 h-16 bg-white rounded-lg p-1">
              <img src="${wallet.qr_code || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjNmIxYWZmIi8+Cjx0ZXh0IHg9IjMyIiB5PSIzNiIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iMTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkFERFI8L3RleHQ+Cjwvc3ZnPgo='}" 
                   alt="QR Code" class="w-full h-full object-cover rounded">
            </div>
          </div>
          
          <div class="balance-info mb-4">
            <div class="text-2xl font-bold text-white mb-1" id="balance-${wallet.id}">
              Loading...
            </div>
            <div class="text-gray-400 text-sm">Available Balance</div>
          </div>
          
          <div class="flex space-x-3">
            <button onclick="walletIntegration.showDepositModal('${wallet.wallet_address}')" 
                    class="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300">
              Deposit
            </button>
            <button onclick="walletIntegration.showSendModal('${wallet.wallet_address}')" 
                    class="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300">
              Send
            </button>
          </div>
        </div>
      `).join('');

      // Load balances for each wallet
      wallets.forEach(async (wallet) => {
        const balance = await this.getWalletBalance(wallet.wallet_address);
        const balanceElement = document.getElementById(`balance-${wallet.id}`);
        if (balanceElement) {
          balanceElement.textContent = `${parseFloat(balance.balance).toFixed(4)} ${balance.symbol}`;
        }
      });

    } catch (error) {
      console.error('Failed to load wallets:', error);
    }
  }

  // Show deposit modal
  showDepositModal(address) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
      <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-gray-700">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Deposit Crypto
          </h3>
          <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="text-center mb-6">
          <div class="qr-code-large w-48 h-48 mx-auto mb-4 bg-white rounded-xl p-4">
            <div id="depositQR" class="w-full h-full flex items-center justify-center text-purple-600 font-bold">
              QR CODE
            </div>
          </div>
          
          <div class="bg-gray-800 rounded-lg p-4 mb-4">
            <p class="text-gray-400 text-sm mb-2">Wallet Address:</p>
            <p class="text-white font-mono text-sm break-all">${address}</p>
            <button onclick="navigator.clipboard.writeText('${address}')" 
                    class="mt-2 text-cyan-400 hover:text-cyan-300 text-sm">
              📋 Copy Address
            </button>
          </div>
          
          <div class="text-gray-400 text-sm">
            <p class="mb-2">⚠️ Only send ETH, BNB, or MATIC to this address</p>
            <p>Sending other tokens may result in permanent loss</p>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Generate QR code for the address
    this.generateQRCode(address).then(qrCode => {
      const qrElement = document.getElementById('depositQR');
      if (qrElement && qrCode) {
        qrElement.innerHTML = `<img src="${qrCode}" alt="Deposit QR" class="w-full h-full object-contain">`;
      }
    });
  }

  // Show send modal
  showSendModal(fromAddress) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
      <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-gray-700">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Send Crypto
          </h3>
          <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <form class="space-y-4">
          <div>
            <label class="block text-gray-400 text-sm mb-2">To Address:</label>
            <input type="text" placeholder="0x..." 
                   class="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none">
          </div>
          
          <div>
            <label class="block text-gray-400 text-sm mb-2">Amount:</label>
            <input type="number" step="0.0001" placeholder="0.0000" 
                   class="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none">
          </div>
          
          <div>
            <label class="block text-gray-400 text-sm mb-2">Network:</label>
            <select class="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none">
              <option value="ethereum">Ethereum (ETH)</option>
              <option value="bsc">Binance Smart Chain (BNB)</option>
              <option value="polygon">Polygon (MATIC)</option>
            </select>
          </div>
          
          <button type="button" 
                  class="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
            Send Transaction
          </button>
        </form>
        
        <div class="mt-4 text-center text-gray-400 text-sm">
          <p>⚠️ Double-check the address before sending</p>
          <p>Transactions cannot be reversed</p>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
  }
}

// Initialize wallet integration
export const walletIntegration = new WalletIntegration();