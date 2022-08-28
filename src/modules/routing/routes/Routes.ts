export enum Routes {
  Register = '/register',
  ForgotPassword = '/forgot-password',
  Login = '/login',
  Onboarding = '/onboarding',
  Landing = '/', // Last page to do before inbox,chat,notifications
  Profile = '/profile',
  MySportFacilities = '/sport-facilities', // List of objects created by the user and he can modify them //3rd
  MyReservations = '/my-reservations', // List of reservations made by the user
  AvailableFacilities = '/available-facilities', // List of objects available for the user to reserve
  FacilityBuilder = '/create-sport-facility', // Create a new sport facility //2st page to make
  Notifications = '/notifications', // TODO
  Chat = '/messages/:id', // TODO
  Inbox = '/inbox', // TODO
  NotFound = '*',
}
