export interface NavItem {
  item: string;
  link?: string;
}

export const navItemsLoggedUser: NavItem[] = [
  {
    item: 'Search for facilities',
    link: '/',
  },
  {
    item: 'Available Facilities',
    link: '/available-facilities',
  },
  {
    item: 'My Reservations',
    link: '/my-reservations',
  },
  {
    item: 'Host Facility',
    link: '/create-sport-facility',
  },
  {
    item: 'My Sport Facilities',
    link: '/sport-facilities',
  },
  {
    item: 'My Reserved Facilities',
    link: '/my-reserved-facilities',
  },
  {
    item: 'Notifications',
    link: '/notifications',
  },
  {
    item: 'Logout',
  },
];

export const navItemsNotLoggedUser: NavItem[] = [
  {
    item: 'Search for facilities',
    link: '/',
  },
  {
    item: 'Login',
    link: '/login',
  },
  {
    item: 'Create account',
    link: '/register',
  },
  {
    item: 'Forgot password',
    link: '/forgot-password',
  },
];
