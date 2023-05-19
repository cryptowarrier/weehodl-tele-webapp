
export const networks = {
  1: {
    chainId: `0x${parseInt(1, 10).toString(16)}`,
    chainName: 'Ethereum Mainnet',
    nativeCurrency: {
      name: 'Ether Coin',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://mainnet.infura.io/v3/52ee1cb21e8a4095aef5f92fa50f70e3'],
    blockExplorerUrls: ['https://etherscan.io'],
  },
  4: {
    chainId: `0x${parseInt('4', 10).toString(16)}`,
    chainName: 'Rinkeby Test Network',
    nativeCurrency: {
      name: 'Rinkeby Coin',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
    blockExplorerUrls: ['https://rinkeby.etherscan.io'],
  },
  5: {
    chainId: `0x${parseInt('5', 10).toString(16)}`,
    chainName: 'goerli Test Network',
    nativeCurrency: {
      name: 'goerli Coin',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
    blockExplorerUrls: ['https://goerli.etherscan.io'],
  },
  56: {
    chainId: `0x${parseInt(56, 10).toString(16)}`,
    chainName: 'BSC Mainnet',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://bsc-dataseed.binance.org'],
    blockExplorerUrls: ['https://bscscan.com'],
  },
  97: {
    chainId: `0x${parseInt(97, 10).toString(16)}`,
    chainName: 'BSC Testnet',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: [
      'https://data-seed-prebsc-2-s2.binance.org:8545',
      'https://data-seed-prebsc-1-s1.binance.org:8545/',
      'https://endpoints.omniatech.io/v1/bsc/testnet/public',
    ],
    blockExplorerUrls: ['https://testnet.bscscan.com'],
  },
  128: {
    chainId: `0x${parseInt(128, 10).toString(16)}`,
    chainName: 'HECO Mainnet',
    nativeCurrency: {
      name: 'Huobi Token',
      symbol: 'HT',
      decimals: 18,
    },
    rpcUrls: ['https://http-mainnet.hecochain.com'],
    blockExplorerUrls: ['https://hecoinfo.com'],
  },
  43114: {
    chainId: `0x${parseInt(43114, 10).toString(16)}`,
    chainName: 'Avalanche C-Chain',
    nativeCurrency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: 18,
    },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://cchain.explorer.avax.network/'],
  },
  137: {
    chainId: `0x${parseInt(137, 10).toString(16)}`,
    chainName: 'Polygon Mainnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://rpc-mainnet.maticvigil.com'],
    blockExplorerUrls: ['https://explorer.matic.network/'],
  },
  250: {
    chainId: `0x${parseInt(250, 10).toString(16)}`,
    chainName: 'Fantom Opera',
    nativeCurrency: {
      name: 'FTM',
      symbol: 'FTM',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.ftm.tools'],
    blockExplorerUrls: ['https://ftmscan.com'],
  },
  4002: {
    chainId: '0xfa2',
    chainName: 'Fantom testnet',
    nativeCurrency: {
      name: 'FTM',
      symbol: 'FTM',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.testnet.fantom.network/'],
    blockExplorerUrls: ['https://ftmscan.com'],
  },
};


