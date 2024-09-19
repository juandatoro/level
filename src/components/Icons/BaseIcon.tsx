import type { SVGProps } from 'react'

export type IconType = (props: SVGProps<SVGSVGElement>) => JSX.Element

export const BaseIcon = ({ children, ...rest }: SVGProps<SVGSVGElement>) => (
  <svg focusable='false' aria-hidden='true' {...rest}>
    {children}
  </svg>
)
