import React from 'react'

import { SVG_ICONS } from '@/constants/icons'

export interface IconWrappedComponentProps {
  role?: string
  className?: string
  icon: keyof typeof SVG_ICONS
}

export const IconWrappedComponent = (props: IconWrappedComponentProps) => {
  const { className, icon, role = 'icon' } = props
  const IconComponent = SVG_ICONS[icon]

  return <IconComponent role={role} className={className} />
}
