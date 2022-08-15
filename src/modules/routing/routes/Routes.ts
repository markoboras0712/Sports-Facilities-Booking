export enum Routes {
  SignUp = '/sign-up', // TODO: rename to Register
  ForgotPassword = '/forgot-password',
  Login = '/login',
  Onboarding = '/onboarding',
  Landing = '/',
  Profile = '/profile',
  MySportFacilities = '/sport-facilities', // List of objects created by the user and he can modify them
  MyReservations = '/my-reservations', // List of reservations made by the user
  AvailableFacilities = '/available-facilities', // List of objects available for the user to reserve
  FacilityBuilder = '/sport-facility/:id', // Create a new sport facility
  Notifications = '/notifications',
  Chat = '/messages/:id',
  Inbox = '/inbox',
  NotFound = '*',
}
