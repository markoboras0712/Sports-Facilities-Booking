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
  AvailableFacilities = '/available-facilities',
  MakeReservation = '/create-reservation',
  FacilityBuilder = '/create-sport-facility',
  Notifications = '/notifications', // TODO
  Chat = '/messages/:id', // TODO
  Inbox = '/inbox', // TODO
  NotFound = '*',
}
