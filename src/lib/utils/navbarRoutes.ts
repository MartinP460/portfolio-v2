export type NavbarRoute = {
  /** Name to be displayed. */
  name: string
  /** The href of the route. */
  href: string
  /** The order which it appears in. */
  order: 1 | 2 | 3 | 4 | 5 | 6
  /** The pixel offset of the active indicator in the navbar. */
  offset: number
}

export const navbarRoutes: Record<string, NavbarRoute> = {
  '/': {
    name: 'home',
    href: '/',
    order: 1,
    offset: 40
  },
  '/projects': {
    name: 'projects',
    href: '/projects',
    order: 2,
    offset: 178
  },
  '/experience': {
    name: 'experience',
    href: '/experience',
    order: 3,
    offset: 313
  },
  '/education': {
    name: 'education',
    href: '/education',
    order: 4,
    offset: 450
  },
  '/toolbox': {
    name: 'toolbox',
    href: '/toolbox',
    order: 5,
    offset: 585
  },
  '/about': {
    name: 'about me',
    href: '/about',
    order: 6,
    offset: 720
  }
}

export const navbarRoutesNames = Object.keys(navbarRoutes)
export const navbarRoutesArray = Object.values(navbarRoutes)
