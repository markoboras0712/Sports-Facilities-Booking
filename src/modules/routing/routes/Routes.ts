export enum Routes {
  Register = '/register',
  ForgotPassword = '/forgot-password',
  Login = '/login',
  Onboarding = '/onboarding',
  Landing = '/', // Last page to do before inbox,chat,notifications
  Profile = '/profile', // 1st
  MySportFacilities = '/sport-facilities', // List of objects created by the user and he can modify them //3rd
  MyReservations = '/my-reservations', // List of reservations made by the user
  AvailableFacilities = '/available-facilities', // List of objects available for the user to reserve
  FacilityBuilder = '/sport-facility/:id', // Create a new sport facility //2st page to make
  Notifications = '/notifications',
  Chat = '/messages/:id',
  Inbox = '/inbox',
  NotFound = '*',
}
