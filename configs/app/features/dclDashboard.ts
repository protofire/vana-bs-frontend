import type { Feature } from './types';

import { getEnvValue } from '../utils';

const title = 'Data Capital Locked Dashboard';

const config: Feature<{ url: string }> = (() => {
  const enabled = getEnvValue('NEXT_PUBLIC_DCL_DASHBOARD_ENABLED');
  const url = getEnvValue('NEXT_PUBLIC_DCL_DASHBOARD_URL') as string;

  return Object.freeze({
    title,
    url,
    isEnabled: enabled === 'true' && url !== undefined,
  });
})();

export default config;
