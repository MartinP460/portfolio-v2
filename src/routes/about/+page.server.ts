import { ContentType, getContent, type About } from '$lib/utils/getContent'

export async function load() {
  const about = (await getContent<About>(ContentType.About))[0]

  return { about }
}
