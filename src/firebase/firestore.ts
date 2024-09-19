/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getFirestore,
  connectFirestoreEmulator,
  doc,
  collection,
  getDocs,
  query,
  where,
  getDoc,
  onSnapshot,
  DocumentReference,
  type DocumentData,
} from 'firebase/firestore'
import firebase_app from './client'

const db = getFirestore(firebase_app)
const env = import.meta.env.VITE_ENVIRONMENT

if (env === 'local') {
  connectFirestoreEmulator(db, 'localhost', 8080)
}

const getAllDocumentsFromCollection = async (col: string) => {
  const collectionRef = collection(db, col)
  const snapshot = await getDocs(collectionRef)
  const documents = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    }
  })

  onSnapshot(query(collectionRef), (querySnapshot) => {
    const data: any[] = []
    querySnapshot.forEach((doc) => {
      data.push(doc.data())
    })
  })

  return documents
}

type DocumentWithID = { id: string } & DocumentData

const getDocumentsFromCollectionQuery = async (col: string, field: string, operator: any, value: any) => {
  const collectionRef = query(collection(db, col), where(field, operator, value))
  console.log(collectionRef)

  const snapshot = await getDocs(collectionRef)
  console.log(snapshot.docs)

  const documents = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    }
  })
  return documents as DocumentWithID[]
}

const getDocumentFromCollection = async (col: string, id: string) => {
  const docRef = doc(db, col, id)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) {
    throw new Error('Document does not exist')
  }
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as DocumentWithID
  }
}

const fetchDocumentsFromReferences = async (items: DocumentReference[] | string[]) => {
  const fetchedDocs: DocumentData[] = []
  const fetchPromises = items
    .flat()
    .filter((item) => item instanceof DocumentReference)
    .map(async (reference) => {
      if (reference instanceof DocumentReference) {
        const docSnap = await getDoc(reference)
        if (docSnap.exists()) {
          return docSnap.data()
        } else {
          console.log('Document does not exist for this reference:', reference.path)
          return null // or handle as needed
        }
      }
    })

  const results = await Promise.all(fetchPromises)
  results.forEach((doc) => {
    if (doc && doc !== null) {
      fetchedDocs.push(doc)
    }
  })

  return fetchedDocs
}

export {
  getAllDocumentsFromCollection,
  getDocumentsFromCollectionQuery,
  getDocumentFromCollection,
  fetchDocumentsFromReferences,
}
