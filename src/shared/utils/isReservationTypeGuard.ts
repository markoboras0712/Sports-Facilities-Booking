import { WindowLocation } from '@reach/router';

interface ExtendedLocation extends WindowLocation<unknown> {
  state: {
    creatorId: string;
    facilityId: string;
  };
}

export function isReservationTypeGuard(
  location: WindowLocation<unknown>,
): location is ExtendedLocation {
  return typeof location.state === 'object' && location.state !== null;
}
