import type { Feature } from './types';

import chain from '../chain';
import { getEnvValue } from '../utils';

const walletConnectProjectId = getEnvValue('NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID');

const title = 'Blockchain interaction (writing to contract, etc.)';

const config: Feature<{ walletConnect: { projectId: string } }> = (() => {

  console.log('id', chain.id); // eslint-disable-line
  console.log('name', chain.name); // eslint-disable-line
  console.log('currency', chain.currency); // eslint-disable-line
  console.log('rpcUrls', chain.rpcUrls); // eslint-disable-line
  console.log('wc', walletConnectProjectId?.slice(0, 5)); // eslint-disable-line
  console.log('should be enabled', Boolean(chain.id && chain.name && chain.currency.name && chain.currency.symbol && chain.currency.decimals && chain.rpcUrls.length > 0 && walletConnectProjectId)) // eslint-disable-line

  if (
    // all chain parameters are required for wagmi provider
    // @wagmi/chains/dist/index.d.ts
    chain.id &&
    chain.name &&
    chain.currency.name &&
    chain.currency.symbol &&
    chain.currency.decimals &&
    chain.rpcUrls.length > 0 &&
    walletConnectProjectId
  ) {
    return Object.freeze({
      title,
      isEnabled: true,
      walletConnect: {
        projectId: walletConnectProjectId,
      },
    });
  }

  return Object.freeze({
    title,
    isEnabled: false,
  });
})();

export default config;
