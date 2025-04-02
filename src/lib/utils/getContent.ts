import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import type { Picture } from 'vite-imagetools'
import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'
import { gfmHeadingId } from 'marked-gfm-heading-id'

const contentDir = join(process.cwd(), '/content')

const marked = new Marked(
  markedHighlight({
    emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, { language }).value
    }
  })
).use(gfmHeadingId())

export const getContent = async <T>(type: ContentType) => {
  const contentTypeDir = `${contentDir}/${type}`
  const fileNames = fs.readdirSync(contentTypeDir)

  const contentList = await Promise.all(
    fileNames.map(async (fileName) => {
      const fullPath = join(contentTypeDir, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      const { data, content } = matter(fileContents)
      const htmlContent = marked.parse(content)

      return {
        ...data,
        ...(data?.thumbnail ? { thumbnail: await convertThumbnailToPicture(data.thumbnail) } : {}),
        content: htmlContent,
        tableOfContents:
          type === ContentType.Projects && content ? getTableOfContents(content) : undefined
      } as T
    })
  )

  return contentList
}

const getTableOfContents = (markdown: string) => {
  const regexHeaders = /#{1,6}.+/g
  const headers: string[] | null = markdown.match(regexHeaders)
  return (
    headers?.map((header) => ({
      title: header.replace(/^#+\s*/, ''),
      level: (header.match(/#/g) || []).length,
      id: header
        .replace(/^#+\s*/, '')
        .toLowerCase()
        .replaceAll(' ', '-')
    })) ?? []
  )
}

const convertThumbnailToPicture = async (thumbnail: string): Promise<Picture | null> => {
  try {
    // Note that Vite requires that we use a relative import and that it ends with a file extension.
    const image = (await import(
      `../../../static/thumbnails/${thumbnail}.jpg?enhanced`
    )) as unknown as {
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
  path?: string
  slug: string
  thumbnail?: Picture
  liveUrl?: string
  repoUrl?: string
  priority: number
  content?: string
  tableOfContents?: {
    id: string
    title: string
    level: number
  }[]
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

export type Education = {
  institutionName: string
  educationName: string
  years: string
  coursesTaken: string[]
  thesisTopic: string
  thesisTitle: string
}

export enum ContentType {
  Experience = 'experience',
  Projects = 'projects',
  About = 'about',
  Education = 'education'
}
