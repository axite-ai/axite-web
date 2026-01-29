import type { PropsWithChildren } from 'react'

import { useCommandMenuTouchGestures } from './hooks/viewHooks'

export function CommandHeader({ children }: PropsWithChildren) {
  const gestures = useCommandMenuTouchGestures()

  return (
    <div
      onTouchStart={gestures?.handleTouchStart}
      onTouchMove={gestures?.handleTouchMove}
      onTouchEnd={gestures?.handleTouchEnd}
    >
      {children}
    </div>
  )
}
