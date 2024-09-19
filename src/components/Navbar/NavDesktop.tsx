import { routes } from '@src/routes'
import LogoIcon from '@src/icons/logo.astro'

export const NavDesktop = () => {
  return (
    <ul className='hidden gap-5 text-sm lg:flex lg:items-center'>
      <li>
        <a className='flex items-center gap-1 uppercase transition-all hover:text-neutral-400'>
          <LogoIcon class='text-white hover:text-neutral-100 ' />
        </a>
      </li>
      {routes.map((route) => {
        const { href, title } = route
        return (
          <li key={href}>
            <a href={href} className='flex items-center gap-1 uppercase transition-all hover:text-neutral-400'>
              {title}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
