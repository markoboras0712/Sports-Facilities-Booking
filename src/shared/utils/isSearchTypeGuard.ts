import { WindowLocation } from '@reach/router';

interface ExtendedLocation extends WindowLocation<unknown> {
  state: {
    searchFacilityInputValue: string;
  };
}

export function isSearchTypeGuard(
  location: WindowLocation<unknown>,
): location is ExtendedLocation {
  return typeof location.state === 'object' && location.state !== null;
}
