import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import type { Picture } from 'vite-imagetools'
import monkey from '$lib/assets/monkey.jpg?enhanced'

const contentDir = join(process.cwd(), '/content')

export const getContent = <T>(type: ContentType) => {
  const contentTypeDir = `${contentDir}/${type}`
  const fileNames = fs.readdirSync(contentTypeDir)

  const contentList = fileNames.map((fileName) => {
    const fullPath = join(contentTypeDir, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const { data, content } = matter(fileContents)

    return {
      ...data,
      ...(data?.thumbnail ? { thumbnail: convertThumbnailToPicture(data.thumbnail) } : {}),
      content
    } as T
  })

  return contentList
}

const convertThumbnailToPicture = (thumbnail: string): Picture | null => {
  switch (thumbnail) {
    case 'monkey.jpg':
      return monkey
    default:
      return null
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

export enum ContentType {
  Experience = 'experience',
  Projects = 'projects'
}
