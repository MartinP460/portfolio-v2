import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import type { Picture } from 'vite-imagetools'

const contentDir = join(process.cwd(), '/content')

export const getContent = async <T>(type: ContentType) => {
  const contentTypeDir = `${contentDir}/${type}`
  const fileNames = fs.readdirSync(contentTypeDir)

  const contentList = await Promise.all(
    fileNames.map(async (fileName) => {
      const fullPath = join(contentTypeDir, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      const { data, content } = matter(fileContents)

      return {
        ...data,
        ...(data?.thumbnail ? { thumbnail: await convertThumbnailToPicture(data.thumbnail) } : {}),
        content
      } as T
    })
  )

  return contentList
}

const convertThumbnailToPicture = async (thumbnail: string): Promise<Picture | null> => {
  try {
    // Note that Vite requires that we use a relative import and that it ends with a file extension.
    const image = (await import(`../../../static/${thumbnail}.jpg?enhanced`)) as unknown as {
      default: Picture
    }

    return image.default
  } catch {
    throw new Error(`No image with filename \`${thumbnail}\` in /static/.`)
  }
}

export type Project = {
  title: string
  intro: string
  tags: string[]
  path: string
  slug: string
  thumbnail: Picture
  liveUrl: string
  repoUrl: string
  priority: number
}

export type Experience = {
  companyName: string
  employerNumber: 1
  position: string
  timePeriod: string
  logo: string
  content: string
}

export type About = {
  content: string
  thumbnail: Picture
}

export enum ContentType {
  Experience = 'experience',
  Projects = 'projects',
  About = 'about'
}
