import { ContentType, getContent, type Project } from '$lib/utils/getContent'

export async function load() {
  const unsortedProjects = await getContent<Project>(ContentType.Projects)
  const highlightedProjects = unsortedProjects.sort((a, b) => a.priority - b.priority).slice(0, 3)

  return { projects: highlightedProjects }
}
