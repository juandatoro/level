import { Overlay } from '@components'
import { Fragment, useEffect, useMemo, useState, type CSSProperties, type PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'
import { Squash as Hamburger } from 'hamburger-react'
import LogoIcon from '@src/icons/logo.astro'

export enum DrawerState {
  Opening,
  Open,
  Closing,
  Closed,
}

export type TimeoutId = ReturnType<typeof setTimeout> | undefined

export type DrawerProps = PropsWithChildren & {
  isOpen: boolean
  duration?: number
  withCover?: boolean
  withHeader?: boolean
  onClose?: () => void
  offset?: number
}

export const Drawer = ({
  children,
  isOpen,
  onClose = () => {},
  withCover = false,
  withHeader = true,
  duration = 400,
  offset = 300,
}: DrawerProps) => {
  const [currentState, setCurrentState] = useState(DrawerState.Closed)

  const drawerStyles: CSSProperties = useMemo(
    () => ({
      position: 'fixed',
      zIndex: 100,
      top: 0,
      left: isOpen ? 0 : `-${offset}px`,
      height: '100%',
      transitionDuration: `${duration / 1000}s`,
      transitionProperty: 'left',
    }),
    [isOpen, duration, offset]
  )

  useEffect(() => {
    if (isOpen) {
      if (currentState === DrawerState.Closed) {
        setCurrentState(DrawerState.Opening)
        setTimeout(() => setCurrentState(DrawerState.Open), 0)
      }
    } else if (currentState === DrawerState.Open) {
      setCurrentState(DrawerState.Closing)
      setTimeout(() => setCurrentState(DrawerState.Closed), duration)
    }
  }, [currentState, setCurrentState, isOpen, duration])

  return (
    <Fragment>
      {createPortal(
        <Fragment>
          {withCover && (
            <Overlay
              mounted={currentState !== DrawerState.Closed}
              opaque={currentState === DrawerState.Open}
              onClose={onClose}
            />
          )}
          <aside style={drawerStyles} className='flex flex-col bg-drawer' role='dialog' aria-modal='true'>
            {withHeader && (
              <header id='drawer-header' className=' flex justify-between p-5 text-white'>
                <svg width='95' height='50' viewBox='0 0 95 60'>
                  <path
                    d='M0.341736 0.0449829H4.18678V36.5432L14.071 36.5377V40.3219H0.344983L0.341736 0.0449829Z'
                    fill='currentColor'
                  ></path>
                  <path
                    d='M94.4515 19.6664H90.6074V56.1645L80.7255 56.159V59.9432H94.4483L94.4515 19.6664Z'
                    fill='currentColor'
                  ></path>
                  <path
                    d='M17.9033 0.0447388H33.5146V3.82345H21.7484V20.6981H31.1098V24.4824H21.7484V36.5525L33.5146 36.5457V40.3243H17.9033V0.0447388Z'
                    fill='currentColor'
                  ></path>
                  <path
                    d='M76.8921 19.6648H61.2809V23.4435H73.0472V40.3182H63.6857V44.1025H73.0472V56.1727L61.2809 56.1657V59.9444H76.8921V19.6648Z'
                    fill='currentColor'
                  ></path>
                  <path
                    d='M37.3502 0.0359497L41.2062 0.0447687L47.2986 36.5429H48.0045L53.6282 0.0447687H57.4528L51.2733 40.317L44.1162 40.3216L37.3502 0.0359497Z'
                    fill='currentColor'
                  ></path>
                  <path
                    d='M48.6442 51.6194C49.2721 51.2091 49.5781 50.5454 49.5781 49.5923C49.5781 48.6532 49.2712 47.9941 48.6395 47.5763C48.1724 47.2681 47.5649 47.1121 46.8339 47.1121H44.406V52.0716H46.8339C47.568 52.0716 48.1772 51.9194 48.6442 51.6194Z'
                    fill='currentColor'
                  ></path>
                  <path
                    d='M7.0533 49.5922C7.0533 48.501 7.46719 47.6018 8.28333 46.9194C9.00806 46.3074 9.85462 45.9962 10.7978 45.9962H14.4113V47.1121H10.7978C10.1295 47.1121 9.55552 47.3236 9.04399 47.7586C8.48162 48.2363 8.20833 48.8362 8.20833 49.5922V54.4512C8.20833 55.1786 8.44726 55.7621 8.94081 56.2353C9.43365 56.7094 10.0412 56.9389 10.7978 56.9389H13.3805V51.9719H11.6117V50.8552H14.5425V58.0398H10.7978C9.73501 58.0398 8.83769 57.6948 8.12941 57.0146C7.41562 56.3291 7.0533 55.4667 7.0533 54.4512V49.5922ZM16.1027 45.9962H19.6857C20.6556 45.9962 21.4848 46.2197 22.1519 46.6583C23.1069 47.2861 23.5918 48.273 23.5918 49.5922C23.5918 51.3014 22.8102 52.4473 21.3232 52.9364L23.7379 57.655L22.6861 58.1058L20.148 53.171C20.1245 53.1726 20.1012 53.174 20.0777 53.1755C19.9434 53.1838 19.813 53.1883 19.6857 53.1883H17.2577V57.9288H16.1027V45.9962ZM25.1523 49.5922C25.1523 48.6016 25.5193 47.7466 26.2439 47.0507C26.9717 46.3517 27.8651 45.9962 28.8967 45.9962C29.9236 45.9962 30.8147 46.3517 31.5426 47.0507C32.2719 47.7518 32.6413 48.6068 32.6413 49.5922V54.4512C32.6413 55.4367 32.2719 56.2916 31.5433 56.9921C30.8194 57.6873 29.9291 58.0398 28.8967 58.0398C27.8596 58.0398 26.967 57.6873 26.2439 56.9929C25.5193 56.2969 25.1523 55.4419 25.1523 54.4512V49.5922ZM34.2016 46.1147H35.3565V54.4512C35.3565 55.1487 35.6034 55.7254 36.1118 56.2129C36.6201 56.7018 37.2199 56.9389 37.9461 56.9389C38.6724 56.9389 39.269 56.7026 39.7712 56.2151C40.2819 55.7254 40.5288 55.1487 40.5288 54.4512V46.1147H41.6908V54.4512C41.6908 55.4367 41.3213 56.2916 40.5928 56.9921C39.8688 57.6873 38.9786 58.0398 37.9461 58.0398C36.9092 58.0398 36.0165 57.6873 35.2934 56.9921C34.5695 56.2976 34.2016 55.4419 34.2016 54.4512V46.1147ZM43.251 45.9962H46.8339C47.8038 45.9962 48.6332 46.2197 49.3001 46.6583C50.2551 47.2861 50.7402 48.273 50.7402 49.5922C50.7402 50.9331 50.2536 51.9261 49.2954 52.5426C48.6238 52.9716 47.796 53.1883 46.8339 53.1883H44.4061V57.9288H43.251V45.9962ZM0.344971 59.9432H57.4485V44.1431H0.344971V59.9432Z'
                    fill='currentColor'
                  ></path>
                  <path
                    d='M21.4958 51.6194C22.1238 51.2091 22.4298 50.5454 22.4298 49.5923C22.4298 48.6532 22.123 47.9941 21.4912 47.5763C21.0241 47.2681 20.4165 47.1121 19.6857 47.1121H17.2578V52.0716H19.6857C20.4197 52.0716 21.0289 51.9194 21.4958 51.6194Z'
                    fill='currentColor'
                  ></path>
                  <path
                    d='M28.8966 56.9388C29.623 56.9388 30.2196 56.7025 30.7218 56.2151C31.2324 55.7253 31.4792 55.1487 31.4792 54.4512V49.5922C31.4792 48.8955 31.2324 48.3218 30.7248 47.8388C30.2196 47.3491 29.6222 47.1121 28.8966 47.1121C28.1713 47.1121 27.5715 47.3491 27.0623 47.8381C26.5539 48.3218 26.3073 48.8955 26.3073 49.5922V54.4512C26.3073 55.1487 26.5539 55.7253 27.0623 56.2129C27.5707 56.7018 28.1704 56.9388 28.8966 56.9388Z'
                    fill='currentColor'
                  ></path>
                </svg>

                <Hamburger toggled={isOpen} toggle={onClose} />
              </header>
            )}
            <div id='drawer-content' className='mt-auto flex-1'>
              {children}
            </div>
          </aside>
        </Fragment>,
        document.body,
        'drawer'
      )}
    </Fragment>
  )
}
