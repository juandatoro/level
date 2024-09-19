import { Drawer } from '@components'
import { useState } from 'react'
import { NavDesktop } from './NavDesktop'
import { Squash as Hamburger } from 'hamburger-react'
import LogoIcon from '@src/icons/logo.astro'
import { routes } from '@src/routes'

export type NavbarProps = {
  navigation?: any
  breadcrumbDefinition?: any
  baseUrl?: string
}

const text = {
  es: {
    label: 'redes sociales y botón para alternar tema',
    instagramButtons: {
      instagram: 'Instagram',
      url: 'https://www.instagram.com/levelgroup.design/?hl=es',
      label: 'Instagram de level group, se abrirá en una nueva pestaña',
    },
    linkedinButtons: {
      linkedin: 'Linkedin',
      url: 'https://www.linkedin.com/company/level-group',
      label: 'Linkedin de level group, se abrirá en una nueva pestaña',
    },
    webButtons: {
      web: 'Web',
      url: 'https://www.levelgroup.design',
      label: 'Web de level group, se abrirá en una nueva pestaña',
    },
  },
}

export const Navbar = ({ navigation, breadcrumbDefinition, baseUrl = '/' }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const onClose = () => {
    setIsOpen(false)
  }

  return (
    <div className=''>
      <button onClick={toggleMenu} className='hover:bg-darkerBlue mx-0.5 rounded-md p-0.5 text-white transition'>
        <Hamburger toggled={isOpen} />
      </button>
      <Drawer isOpen={isOpen} onClose={onClose} withCover>
        <div className='flex h-full flex-col justify-between pb-12 pl-8 pr-32'>
          <nav className=''>
            <ul className='flex flex-col gap-4 pt-8'>
              {routes.map((route) => {
                const { href, title } = route
                return (
                  <li key={href}>
                    <a
                      href={href}
                      className='flex items-center gap-1 text-2xl uppercase text-white transition-all hover:text-neutral-100'
                    >
                      {title}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
          <nav className='order-last flex flex-col justify-center gap-6 md:order-first'>
            <h3 className='text-xl font-semibold text-white md:text-black'>CONTACT US</h3>
            <div className='flex gap-4'>
              <a
                target='_blank'
                rel='noopener'
                aria-label={text.es.instagramButtons.label}
                href={text.es.instagramButtons.url}
                className='inline-block text-white transition hover:scale-105 hover:text-secondary hover:opacity-70 md:text-black'
              >
                <svg width='39' height='39' viewBox='0 0 39 39' aria-label='instagram logo'>
                  <path
                    d='M0 11.9724V27.0278C0 33.6292 5.37077 39 11.9724 39H27.0278C33.6292 39 39 33.6292 39 27.0278V11.9724C39 5.37077 33.6292 0 27.0278 0H11.9724C5.37077 0 0 5.37077 0 11.9724ZM3.88092 12.5058C3.88092 7.75006 7.75006 3.88092 12.5058 3.88092H26.4943C31.2501 3.88092 35.1191 7.75006 35.1191 12.5058V26.4943C35.1191 31.2501 31.2501 35.1191 26.4943 35.1191H12.5058C7.75006 35.1191 3.88092 31.2501 3.88092 26.4943V12.5058ZM14.152 19.5C14.152 22.4489 16.5511 24.848 19.5 24.848C22.4489 24.848 24.848 22.4489 24.848 19.5C24.848 16.5511 22.4489 14.152 19.5 14.152C16.5511 14.152 14.152 16.5511 14.152 19.5ZM10.6169 19.5C10.6169 14.6017 14.6017 10.6169 19.5 10.6169C24.3983 10.6169 28.3831 14.6017 28.3831 19.5C28.3831 24.3983 24.3983 28.3831 19.5 28.3831C14.6017 28.3831 10.6169 24.3983 10.6169 19.5ZM29.5037 7.07373C30.7605 7.07373 31.7791 8.09247 31.7791 9.34915C31.7791 10.6059 30.7605 11.6246 29.5037 11.6246C28.247 11.6246 27.2283 10.6059 27.2283 9.34915C27.2283 8.09247 28.247 7.07373 29.5037 7.07373Z'
                    fill='currentColor'
                  ></path>
                </svg>
              </a>
              <a
                target='_blank'
                rel='noopener'
                aria-label={text.es.linkedinButtons.label}
                href={text.es.linkedinButtons.url}
                className='inline-block text-white transition hover:scale-105 hover:text-secondary hover:opacity-70 md:text-black'
              >
                <svg width='39' height='39' fill='none' viewBox='0 0 39 39' aria-label='linkedin logo'>
                  <path
                    d='M30.875 0H8.125C3.63838 0 0 3.63838 0 8.125V30.875C0 35.3616 3.63838 39 8.125 39H30.875C35.3633 39 39 35.3616 39 30.875V8.125C39 3.63838 35.3633 0 30.875 0ZM13 30.875H8.125V13H13V30.875ZM10.5625 10.9395C8.99275 10.9395 7.71875 9.65575 7.71875 8.073C7.71875 6.49025 8.99275 5.2065 10.5625 5.2065C12.1322 5.2065 13.4062 6.49025 13.4062 8.073C13.4062 9.65575 12.1339 10.9395 10.5625 10.9395ZM32.5 30.875H27.625V21.7685C27.625 16.2955 21.125 16.7099 21.125 21.7685V30.875H16.25V13H21.125V15.8681C23.3935 11.6659 32.5 11.3555 32.5 19.8916V30.875Z'
                    fill='currentColor'
                  ></path>
                </svg>
              </a>
            </div>
            <a
              target='_blank'
              rel='noopener'
              aria-label={text.es.webButtons.label}
              href={text.es.webButtons.url}
              className=' text-sm text-white transition hover:scale-105 hover:text-secondary hover:opacity-70 md:text-black'
            >
              @levelgroup.design
            </a>
          </nav>
        </div>
      </Drawer>
    </div>
  )
}
