import { ChainId } from '@aave/contract-helpers';
import { AaveV3Ethereum } from '@bgd-labs/aave-address-book';
import { ReactNode } from 'react';

// Enable for premissioned market
// import { PermissionView } from 'src/components/transactions/FlowCommons/PermissionView';
export type MarketDataType = {
  v3?: boolean;
  marketTitle: string;
  market: CustomMarket;
  // the network the market operates on
  chainId: ChainId | number;
  enabledFeatures?: {
    liquiditySwap?: boolean;
    staking?: boolean;
    governance?: boolean;
    faucet?: boolean;
    collateralRepay?: boolean;
    incentives?: boolean;
    permissions?: boolean;
    debtSwitch?: boolean;
    withdrawAndSwitch?: boolean;
    switch?: boolean;
  };
  permitDisabled?: boolean; // intended to be used for testnets
  isFork?: boolean;
  permissionComponent?: ReactNode;
  disableCharts?: boolean;
  subgraphUrl?: string;
  logo?: string;
  addresses: {
    LENDING_POOL_ADDRESS_PROVIDER: string;
    LENDING_POOL: string;
    WETH_GATEWAY?: string;
    SWAP_COLLATERAL_ADAPTER?: string;
    REPAY_WITH_COLLATERAL_ADAPTER?: string;
    DEBT_SWITCH_ADAPTER?: string;
    WITHDRAW_SWITCH_ADAPTER?: string;
    FAUCET?: string;
    PERMISSION_MANAGER?: string;
    WALLET_BALANCE_PROVIDER: string;
    L2_ENCODER?: string;
    UI_POOL_DATA_PROVIDER: string;
    UI_INCENTIVE_DATA_PROVIDER?: string;
    COLLECTOR?: string;
    V3_MIGRATOR?: string;
    GHO_TOKEN_ADDRESS?: string;
    GHO_UI_DATA_PROVIDER?: string;
  };
};
export enum CustomMarket {
  // v3 test networks, all v3.0.1
  proto_blast_sepolia_v3 = 'proto_blast_sepolia_v3',
  // v3 mainnets
  proto_mainnet_v3 = 'proto_mainnet_v3',
  // external
  // permissioned_market = 'permissioned_market',
}

const apiKey = process.env.NEXT_PUBLIC_SUBGRAPH_API_KEY;

export const marketsData: {
  [key in keyof typeof CustomMarket]: MarketDataType;
} = {
  [CustomMarket.proto_mainnet_v3]: {
    marketTitle: 'Ethereum',
    market: CustomMarket.proto_mainnet_v3,
    chainId: ChainId.mainnet,
    v3: true,
    enabledFeatures: {
      governance: true,
      staking: true,
      liquiditySwap: true,
      collateralRepay: true,
      incentives: true,
      withdrawAndSwitch: true,
      debtSwitch: false,
      switch: true,
    },
    subgraphUrl: `https://gateway-arbitrum.network.thegraph.com/api/${apiKey}/subgraphs/id/Cd2gEDVeqnjBn1hSeqFMitw8Q1iiyV9FYUZkLNRcL87g`,
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: AaveV3Ethereum.POOL_ADDRESSES_PROVIDER,
      LENDING_POOL: AaveV3Ethereum.POOL,
      WETH_GATEWAY: AaveV3Ethereum.WETH_GATEWAY,
      REPAY_WITH_COLLATERAL_ADAPTER: '0x35bb522b102326ea3f1141661df4626c87000e3e',
      SWAP_COLLATERAL_ADAPTER: AaveV3Ethereum.SWAP_COLLATERAL_ADAPTER,
      WALLET_BALANCE_PROVIDER: AaveV3Ethereum.WALLET_BALANCE_PROVIDER,
      UI_POOL_DATA_PROVIDER: AaveV3Ethereum.UI_POOL_DATA_PROVIDER,
      UI_INCENTIVE_DATA_PROVIDER: AaveV3Ethereum.UI_INCENTIVE_DATA_PROVIDER,
      COLLECTOR: AaveV3Ethereum.COLLECTOR,
      GHO_TOKEN_ADDRESS: AaveV3Ethereum.ASSETS.GHO.UNDERLYING,
      GHO_UI_DATA_PROVIDER: AaveV3Ethereum.UI_GHO_DATA_PROVIDER,
      WITHDRAW_SWITCH_ADAPTER: AaveV3Ethereum.WITHDRAW_SWAP_ADAPTER,
      DEBT_SWITCH_ADAPTER: AaveV3Ethereum.DEBT_SWAP_ADAPTER,
    },
  },
  [CustomMarket.proto_blast_sepolia_v3]: {
    marketTitle: 'Blast Sepolia',
    market: CustomMarket.proto_blast_sepolia_v3,
    chainId: 168587773,
    v3: true,
    permitDisabled: true,
    enabledFeatures: {
      faucet: true,
    },
    disableCharts: true,
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: '0x4F286C7Dbe77DCf8B67EE7c37033524ec71B36D9',
      LENDING_POOL: '0xfB2fe12b82c58Bd876277609613bfB61783a44AC',
      WETH_GATEWAY: '0x37cb1153737de3695B461d5f62E8FFE1f2339844',
      FAUCET: '0xc2B165E49a9244Cd510d44120c9064cc561BF1A3',
      WALLET_BALANCE_PROVIDER: '0xE7e0413e49A528ce597C7c8cEd7baB9ED11Ed8d1',
      UI_POOL_DATA_PROVIDER: '0x13D1a122d177E94053Db87dacE92C7a2a7364787',
      UI_INCENTIVE_DATA_PROVIDER: '0x77Ac1cE8c29428875CC9F8A527f789a10a3038fd',
      COLLECTOR: '0xbfa1AE44DA485E8bC0751abfA73b6C0a969909E5',
    },
  },
} as const;
