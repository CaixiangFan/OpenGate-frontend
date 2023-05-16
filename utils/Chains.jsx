const mumbai = {
  id: 80001,
  name: "Mumbai",
  network: "Polygon Mumbai Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Matic",
    symbol: "MATIC",
  },
  rpcUrls: {
    public: { http: [process.env.NEXT_PUBLIC_MUMBAI_RPC_URL] },
    default: { http: [process.env.NEXT_PUBLIC_MUMBAI_RPC_URL] },
  },
  blockExplorers: {
    etherscan: { name: "polygonscan", url: "https://mumbai.polygonscan.com/" },
    default: { name: "polygonscan", url: "https://mumbai.polygonscan.com/" },
  },
};

const sepolia = {
  id: 11155111,
  name: "Sepolia",
  network: "Sepolia Test Netwok",
  nativeCurrency: {
    decimals: 18,
    name: "Ethereum",
    symbol: "SepoliaETH",
  },
  rpcUrls: {
    public: { http: [process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL] },
    default: { http: [process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL] },
  },
  blockExplorers: {
    etherscan: { name: "EtherScan", url: "https://sepolia.etherscan.io/" },
    default: { name: "EtherScan", url: "https://sepolia.etherscan.io/" },
  },
};

const besu = {
  id: 1337,
  name: "Besu private net",
  network: "Besu private net",
  nativeCurrency: {
    decimals: 18,
    name: "Besu Ethereum",
    symbol: "ETH",
  },
  rpcUrls: {
    public: { http: ["http://206.12.93.74:8545"] },
    default: { http: ["http://206.12.93.74:8545"] },
  },
  blockExplorers: {
    etherscan: {
      name: "besu explore",
      url: "http://localhost:25000/explorer/explorer",
    },
    default: {
      name: "besu explore",
      url: "http://localhost:25000/explorer/explorer",
    },
  },
};
// const scroll_alpha_testnet = {
//   id: 534353,
//   name: "Scroll Alpha Testnet",
//   network: "Scroll Alpha Testnet",
//   nativeCurrency: {
//     decimals: 18,
//     name: "Ethereum",
//     symbol: "ETH",
//   },
//   rpcUrls: {
//     public: { http: ["https://alpha-rpc.scroll.io/l2"] },
//     default: { http: ["https://alpha-rpc.scroll.io/l2"] },
//   },
//   blockExplorers: {
//     etherscan: { name: "BlockScout", url: "https://blockscout.scroll.io/" },
//     default: { name: "BlockScout", url: "https://blockscout.scroll.io/" },
//   },
// };

// const polyzk = {
//   id: 1442,
//   name: "Polygon zkEVM Testnet",
//   network: "Polygon zkEVM Testnet",
//   nativeCurrency: {
//     decimals: 18,
//     name: "Ethereum",
//     symbol: "ETH",
//   },
//   rpcUrls: {
//     public: { http: ["https://rpc.public.zkevm-test.net"] },
//     default: { http: ["https://rpc.public.zkevm-test.net"] },
//   },
//   blockExplorers: {
//     etherscan: {
//       name: "zkevm explore",
//       url: "https://explorer.public.zkevm-test.net",
//     },
//     default: {
//       name: "zkevm explore",
//       url: "https://explorer.public.zkevm-test.net",
//     },
//   },
// };

// const taiko = {
//   id: 167003,
//   name: "Taiko A1 (Taiko)",
//   network: "Taiko A1 (Taiko)",
//   nativeCurrency: {
//     decimals: 18,
//     name: "Ethereum",
//     symbol: "ETH",
//   },
//   rpcUrls: {
//     public: { http: ["https://l2rpc.a1.taiko.xyz"] },
//     default: { http: ["https://l2rpc.a1.taiko.xyz"] },
//   },
//   blockExplorers: {
//     etherscan: {
//       name: "taiko explore",
//       url: " https://l2explorer.a1.taiko.xyz/",
//     },
//     default: {
//       name: "taiko explore",
//       url: "https://l2explorer.a1.taiko.xyz/",
//     },
//   },
// };

const Chains = [
  {
    ...mumbai,
    iconUrl:
      "https://github.com/CaixiangFan/chainlink-functions/blob/main/assets/mumbai.png?raw=true",
  },
  {
    ...sepolia,
    iconUrl:
      "https://github.com/CaixiangFan/chainlink-functions/blob/main/assets/sepolia.png?raw=true",
  },
  {
    ...besu,
    iconUrl:
    "https://github.com/CaixiangFan/chainlink-functions/blob/main/assets/besu.png?raw=true",
  },
  // {
  //   ...scroll_alpha_testnet,
  //   iconUrl:
  //     "https://raw.githubusercontent.com/zk-DELX/zkdelx-front/main/assets/scroll.png",
  // },
  // {
  //   ...polyzk,
  //   iconUrl:
  //     "https://github.com/zk-DELX/zkdelx-front/blob/main/assets/polygon.png?raw=true",
  // },
  // {
  //   ...taiko,
  //   iconUrl:
  //     "https://github.com/zk-DELX/zkdelx-front/blob/main/assets/taiko.png?raw=true",
  // },
];

export default Chains;
