import type { DocumentData } from 'firebase/firestore'
import { type Photo as OriginalPhoto } from 'react-photo-album'

type Heading = {
  title: string
  gallery: string[]
}

type Featured = {
  description: string
  gallery: string[]
}

type LevelProject = {
  heading: Heading
  slug: string
}

type Banner = {
  description: string
  gallery: string[]
  level_projects: LevelProject[]
}

type Projects = {
  heading: Heading
  featured: Featured
  banner: Banner
}

export type Photo = OriginalPhoto & {
  url?: string
  showTitle?: boolean
  isLink?: boolean
}

export const getPhotosFromProjects = (projects: Partial<DocumentData>) => {
  const headings = (projects as Projects).banner.level_projects.map((project) => ({
    slug: project.slug,
    ...project.heading,
  }))

  const photos: Photo[] = headings.map((photo) => ({
    src: photo.gallery[0],
    width: 2000,
    height: 1500,
    title: photo.title,
    url: `http://localhost:4321/project/${photo.slug}`,
    showTitle: true,
    isLink: true,
  }))

  return photos
}

export const getPhotosFromProject = (projects: Partial<DocumentData>) => {
  const headings = (projects as Projects).banner.level_projects.map((project) => ({
    slug: project.slug,
    ...project.heading,
  }))

  const photos: Photo[] = headings.map((photo) => ({
    src: photo.gallery[0],
    width: 998,
    height: 562,
    title: photo.title,
  }))

  return photos
}
