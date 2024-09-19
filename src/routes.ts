import { Icon } from './types'

type Routes = {
  title: string
  href: string
  icon?: Icon
}

export const routes: Routes[] = [
  {
    title: 'about',
    href: '/about',
  },
  {
    title: 'projects',
    href: '/projects',
  },
  {
    title: 'awards',
    href: '/awards',
  },
]
