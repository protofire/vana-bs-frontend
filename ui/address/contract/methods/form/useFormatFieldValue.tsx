import React from 'react';

import type { MatchInt } from './utils';

interface Params {
  argType: string;
  argTypeMatchInt: MatchInt | null;
}

export default function useFormatFieldValue({ argType, argTypeMatchInt }: Params) {

  return React.useCallback((value: string | undefined) => {
    if (!value) {
      // For string types, preserve empty string as is
      if (argType === 'string') {
        return '';
      }
      return;
    }

    // For string types, if value is exactly '""', treat it as a two-character string
    // Otherwise, remove any surrounding quotes that might have been added
    if (argType === 'string') {
      if (value === '""') {
        return value;
      }
      // Remove surrounding quotes if they exist
      if (value.startsWith('"') && value.endsWith('"')) {
        return value.slice(1, -1);
      }
      return value;
    }

    if (argTypeMatchInt) {
      // we have to store all numbers as strings to avoid precision loss
      // and we cannot store them as BigInt because the NumberFormat component will not work properly
      // so we just remove all white spaces here otherwise the `viem` library will throw an error on attempt to write value to a contract
      const formattedString = value.replace(/\s/g, '');
      return formattedString;
    }

    if (argType === 'bool') {
      const formattedValue = value.toLowerCase();

      switch (formattedValue) {
        case 'true': {
          return true;
        }

        case 'false':{
          return false;
        }

        default:
          return value;
      }
    }

    return value;
  }, [ argType, argTypeMatchInt ]);
}
