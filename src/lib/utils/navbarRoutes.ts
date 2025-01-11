export type NavbarRoute = {
  /** Name to be displayed. */
  name: string
  /** The href of the route. */
  href: string
  /** The order which it appears in. */
  order: 1 | 2 | 3 | 4 | 5
  /** The pixel offset of the active indicator in the navbar. */
  offset: number
}

export const navbarRoutes: Record<string, NavbarRoute> = {
  '/projects': {
    name: 'projects',
    href: '/projects',
    order: 1,
    offset: 40
  },
  '/experience': {
    name: 'experience',
    href: '/experience',
    order: 2,
    offset: 178
  },
  '/education': {
    name: 'education',
    href: '/education',
    order: 3,
    offset: 313
  },
  '/skills': {
    name: 'skills',
    href: '/skills',
    order: 4,
    offset: 450
  },
  '/about': {
    name: 'about me',
    href: '/about',
    order: 5,
    offset: 585
  }
}

export const navbarRoutesNames = Object.keys(navbarRoutes)
export const navbarRoutesArray = Object.values(navbarRoutes)
