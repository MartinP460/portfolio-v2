import image from '$lib/assets/monkey.jpg?enhanced'
import type { Picture } from 'vite-imagetools'

export type Project = {
  name: string
  slug: string
  path: string
  tags: string[]
  description: string
  thumbnailUrl: Picture
}

const PROJECTS: Project[] = [
  {
    name: 'React Denmark Map',
    slug: 'react-denmark-map',
    path: '/projects/react-denmark-map',
    tags: ['React', 'Typescript', 'Rollup'],
    description:
      'React Denmark Map is a library for React that allows developers to display an SVG of Denmark. It can be programmatically customized through an intuitive API.',
    thumbnailUrl: image
  },
  {
    name: 'Onsplash',
    slug: 'onsplash',
    path: '/projects/onsplash',
    tags: ['Next.js', 'GraphQL', 'Typescript'],
    description:
      "Onsplash is a clone/recreation of the image-sharing platform Unsplash. In addition to replicating Unsplash's iconic gallery design, Onsplash enables users to interacts with posts through CRUD operations.",
    thumbnailUrl: image
  },
  {
    name: 'Strapi blog',
    slug: 'strapi-blog',
    path: '/projects/strapi-blog',
    tags: ['Next.js', 'TailwindCSS', 'Strapi'],
    description:
      'A simple blog posts app built using Strapi and Next.js, meant to practice connecting a CMS to a frontend. Includes several blogs with randomly generated titles and filled with dummy text.',
    thumbnailUrl: image
  }
]

export function getProjects() {
  return PROJECTS
}
