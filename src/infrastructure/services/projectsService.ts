import type { DocumentReference } from 'firebase/firestore'
import {
  getAllDocumentsFromCollection,
  getDocumentFromCollection,
  fetchDocumentsFromReferences,
  getDocumentsFromCollectionQuery,
} from '../../firebase'

enum levelGroup {
  PROJECTS = 'projects',
}

export const getAllProjectService = () => {
  return getAllDocumentsFromCollection(levelGroup.PROJECTS)
}

export const getProjectCollection = async (projectId: string) => {
  const collection = await getDocumentFromCollection(levelGroup.PROJECTS, projectId)
  if (!collection) {
    return null
  }
  return collection
}
