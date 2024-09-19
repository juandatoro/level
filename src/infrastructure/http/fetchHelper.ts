import { log } from 'console'
import type { DocumentData } from 'firebase/firestore'

async function get<T>(incomingReq: Request, endpoint: string, cb: (response: Response) => Promise<T>): Promise<T> {
  const origin = new URL(incomingReq.url).origin
  const response = await fetch(`${origin}${endpoint}`, {
    credentials: 'same-origin',
    headers: incomingReq.headers,
  })

  if (!response.ok) {
    // TODO make this better...
    throw new Error('Fetch failed')
  }
  return cb(response)
}

export const getDataFromService = (incomingReq: Request, path: string) => {
  return get<Partial<DocumentData>>(incomingReq, `/api/get-${path}-data`, async (response) => {
    const homeData = await response.json()
    return homeData
  })
}

export const getDataBYIdFromService = (incomingReq: Request, path: string, id: string) => {
  return get<Partial<DocumentData>>(incomingReq, `/api/get-${path}-data/${id}`, async (response) => {
    const homeData = await response.json()
    return homeData
  })
}
