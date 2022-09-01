export enum Routes {
  Register = '/register',
  ForgotPassword = '/forgot-password',
  Login = '/login',
  Onboarding = '/onboarding',
  Landing = '/',
  Profile = '/profile',
  MySportFacilities = '/sport-facilities',
  EditFacility = '/facility/:id',
  MyReservations = '/my-reservations',
  MyReservedFacilities = '/my-reserved-facilities',
  AvailableFacilities = '/available-facilities',
  QuickSearch = '/quick-search',
  MakeReservation = '/create-reservation',
  FacilityBuilder = '/create-sport-facility',
  Notifications = '/notifications', // TODO
  Chat = '/messages/:id', // TODO
  Inbox = '/inbox', // TODO
  NotFound = '*',
}
