import { Pages } from '@src/infrastructure/domain/pagesEnums'
import type { APIRoute } from 'astro'
import { getPageCollection } from 'src/infrastructure/services/pageService'

export const GET: APIRoute = async () => {
  const pageName = Pages.Home

  const pageCollection = await getPageCollection(pageName)
  if (!pageCollection) {
    return new Response(null, {
      status: 404,
      statusText: 'No fund page',
    })
  }

  const { heading, featured, banner } = pageCollection[0]
  const { description, gallery } = banner

  return new Response(JSON.stringify({ heading, featured, banner: { description, gallery } }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
