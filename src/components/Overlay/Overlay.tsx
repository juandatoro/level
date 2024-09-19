// Libraries
import { type CSSProperties, useEffect, useMemo } from 'react'

type OverlayProps = {
  mounted: boolean
  opaque: boolean
  duration?: number
  onClose?: () => void
  closeOnEscapePressed?: boolean
}

export const Overlay = ({
  mounted,
  opaque,
  duration = 400,
  onClose = () => {},
  closeOnEscapePressed = true,
}: OverlayProps) => {
  const coverStyles: CSSProperties = useMemo(
    () => ({
      display: mounted ? 'block' : 'none',
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      transitionDuration: `${duration / 1000}s`,
      transitionProperty: 'background-color',
      zIndex: 10,
    }),
    [duration, mounted]
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (closeOnEscapePressed) {
      window?.document?.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      if (closeOnEscapePressed) {
        window?.document?.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [onClose, closeOnEscapePressed])

  return <div onClick={onClose} style={coverStyles} className={opaque ? 'bg-black/50' : 'bg-transparent'} />
}
