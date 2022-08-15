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
    item: 'Host Facility',
    link: '/sport-facility/:id',
  },
  {
    item: 'My Sport Facilities',
    link: '/sport-facilities',
  },
  {
    item: 'My Reservations',
    link: '/my-reservations',
  },
  {
    item: 'Notifications',
    link: '/notifications',
  },
  {
    item: 'Inbox',
    link: '/inbox',
  },
  {
    item: 'Profile',
    link: '/profile',
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
    item: 'Available Facilities',
    link: '/available-facilities',
  },
  {
    item: 'Login',
    link: '/login',
  },
  {
    item: 'Create account',
    link: '/sign-up',
  },
  {
    item: 'Forgot password',
    link: '/forgot-password',
  },
];
