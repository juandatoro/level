import { Pages } from '@src/infrastructure/domain/pagesEnums'
import type { APIRoute } from 'astro'
import { getAllNestedCollections, getPageCollection } from 'src/infrastructure/services/pageService'

export const GET: APIRoute = async () => {
  const pageName = Pages.AWARDS

  const pageCollection = await getPageCollection(pageName)
  if (!pageCollection) {
    return new Response(null, {
      status: 404,
      statusText: 'No fund page',
    })
  }

  const { heading, featured, banner } = pageCollection[0]

  const awards = await getAllNestedCollections(banner)

  const { description, gallery } = banner

  return new Response(
    JSON.stringify({ heading, featured, banner: { description, gallery, awards_reference: awards } }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}
