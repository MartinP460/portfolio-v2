import { ContentType, getContent, type Education } from '$lib/utils/getContent'

export async function load() {
  const education = await getContent<Education>(ContentType.Education)

  return { education }
}
