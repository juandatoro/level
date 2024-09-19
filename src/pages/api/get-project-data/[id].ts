import { getProjectCollection } from '@src/infrastructure/services/projectsService'
import type { APIRoute } from 'astro'
import { log } from 'console'

export const GET: APIRoute = async ({ params }) => {
  const documentId = params.id
  console.log(documentId)

  if (!documentId) {
    return new Response(JSON.stringify({ error: 'id not found' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  try {
    const projectCollection = await getProjectCollection(documentId)
    if (!projectCollection || projectCollection.length === 0) {
      return new Response(JSON.stringify({ error: 'No project found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    return new Response(JSON.stringify(projectCollection), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: 'Internal Server Error', details: error?.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
