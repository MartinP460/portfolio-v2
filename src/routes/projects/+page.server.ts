import { ContentType, getContent, type Project } from '$lib/utils/getContent'

export async function load() {
  const unsortedProjects = await getContent<Project>(ContentType.Projects)
  const highlightedProjects = unsortedProjects
    .filter((project) => project.content)
    .sort((a, b) => a.priority - b.priority)

  return { projects: highlightedProjects }
}
