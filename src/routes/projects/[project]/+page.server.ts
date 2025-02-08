import { error } from '@sveltejs/kit'
import { ContentType, getContent, type Project } from '$lib/utils/getContent'

export const load = ({ params }) => {
  const projects = getContent<Project>(ContentType.Projects)
  const project = projects.find((project) => project.slug === params.project)

  if (project) return project

  error(404, 'Not found')
}
