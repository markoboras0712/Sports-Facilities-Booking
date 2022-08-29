export enum Routes {
  Register = '/register',
  ForgotPassword = '/forgot-password',
  Login = '/login',
  Onboarding = '/onboarding',
  Landing = '/', // Last page to do before inbox,chat,notifications
  Profile = '/profile',
  MySportFacilities = '/sport-facilities',
  EditFacility = '/facility/:id',
  MyReservations = '/my-reservations', // List of reservations made by the user
  AvailableFacilities = '/available-facilities', // List of objects available for the user to reserve
  FacilityBuilder = '/create-sport-facility',
  Notifications = '/notifications', // TODO
  Chat = '/messages/:id', // TODO
  Inbox = '/inbox', // TODO
  NotFound = '*',
}
//also need to create page for search and quick search by sport type
