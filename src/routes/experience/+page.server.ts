import { ContentType, getContent, type Experience } from '$lib/utils/getContent'

export function load() {
  const experience = getContent<Experience>(ContentType.Experience).sort(
    (a, b) => b.employerNumber - a.employerNumber
  )

  return { experience }
}
