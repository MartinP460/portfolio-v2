import image from '$lib/assets/monkey.jpg?enhanced'
import type { Picture } from 'vite-imagetools'

export type Project = {
  name: string
  slug: string
  path: string
  thumbnailUrl: Picture
}

const PROJECTS: Project[] = [
  {
    name: 'React Denmark Map',
    slug: 'react-denmark-map',
    path: '/projects/react-denmark-map',
    thumbnailUrl: image
  },
  {
    name: 'Onsplash',
    slug: 'onsplash',
    path: '/projects/onsplash',
    thumbnailUrl: image
  },
  {
    name: 'Strapi blog',
    slug: 'strapi-blog',
    path: '/projects/strapi-blog',
    thumbnailUrl: image
  }
]

export function getProjects() {
  return PROJECTS
}
