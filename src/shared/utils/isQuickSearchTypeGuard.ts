import { WindowLocation } from '@reach/router';

interface ExtendedLocation extends WindowLocation<unknown> {
  state: {
    name: string;
  };
}

export function isQuickSearchTypeGuard(
  location: WindowLocation<unknown>,
): location is ExtendedLocation {
  return typeof location.state === 'object' && location.state !== null;
}
