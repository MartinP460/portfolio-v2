import { ContentType, getContent, type Experience } from '$lib/utils/getContent'

export async function load() {
  const unsortedExperience = await getContent<Experience>(ContentType.Experience)
  const experience = unsortedExperience.sort((a, b) => b.employerNumber - a.employerNumber)

  return { experience }
}
