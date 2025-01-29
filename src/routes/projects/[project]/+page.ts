import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'
import { getProjects } from '$lib/utils/getProjects'

export const load: PageLoad = ({ params }) => {
  const projects = getProjects()
  const project = projects.find((project) => project.slug === params.project)

  if (project) return project

  error(404, 'Not found')
}
