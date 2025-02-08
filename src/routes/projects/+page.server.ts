import { ContentType, getContent, type Project } from '$lib/utils/getContent'

export function load() {
  const projects = getContent<Project>(ContentType.Projects).sort((a, b) => a.priority - b.priority)

  return { projects }
}
