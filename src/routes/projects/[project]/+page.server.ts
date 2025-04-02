import { error } from '@sveltejs/kit'
import { ContentType, getContent, type Project } from '$lib/utils/getContent'

export async function load({ params }) {
  const projects = await getContent<Project>(ContentType.Projects)
  const project = projects.find((project) => project.slug === params.project)

  if (project && project.content) return project

  error(404, 'Not found')
}
