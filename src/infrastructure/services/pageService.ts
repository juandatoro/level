import type { DocumentReference } from 'firebase/firestore'
import {
  getAllDocumentsFromCollection,
  getDocumentFromCollection,
  fetchDocumentsFromReferences,
  getDocumentsFromCollectionQuery,
} from '../../firebase'

enum levelGroup {
  PAGES = 'pages',
  AWARDS = 'awards',
  PROJECTS = 'projects',
}

export const getAllPagesService = () => {
  return getAllDocumentsFromCollection(levelGroup.PAGES)
}

export const getPageByIdService = async (id: string) => {
  const data = await getDocumentFromCollection(levelGroup.PAGES, id)
  return data
}

export const getAllAwardsService = () => {
  return getAllDocumentsFromCollection(levelGroup.AWARDS)
}

export const getAllProjectsService = () => {
  return getAllDocumentsFromCollection(levelGroup.PROJECTS)
}

export const getProjectByIdService = async (id: string) => {
  const data = await getDocumentFromCollection(levelGroup.PROJECTS, id)
}

export const getAllNestedCollections = async (subCollections: any) => {
  const arrayCollections = Object.values(subCollections).filter(
    (subCollection: any) => subCollection && typeof subCollection === 'object'
  )

  const collections = await fetchDocumentsFromReferences(arrayCollections as string[] | DocumentReference[])

  return collections
}

export const getPageCollection = async (pageName: string) => {
  const collection = await getDocumentsFromCollectionQuery(levelGroup.PAGES, 'page_name', '==', pageName)
  if (!collection) {
    return null
  }
  return collection
}
