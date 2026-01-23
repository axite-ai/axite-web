'use client'

import { useLayoutEffect, useRef } from 'react'
import { useSnapshot } from 'valtio'
import { useCommandContext } from '../../internal/Context'
import { type DialogSize, type ITouchHandlers } from '../../internal/state/viewState.types'

// No-op function for when context is not available (standalone sites without CommandProvider)
const noop = () => {}

const useCommandMenuInitiated = () => {
  const ctx = useCommandContext()
  if (!ctx) return false
  const { viewState } = ctx
  const { initiated } = useSnapshot(viewState)
  return initiated
}

const useCommandMenuOpen = () => {
  const ctx = useCommandContext()
  if (!ctx) return false
  const { viewState } = ctx
  const { open } = useSnapshot(viewState)
  return open
}

const useSetCommandMenuOpen = () => {
  const ctx = useCommandContext()
  if (!ctx) return noop
  const { viewState } = ctx
  const { setOpen } = useSnapshot(viewState)
  return setOpen
}

const useToggleCommandMenu = () => {
  const ctx = useCommandContext()
  if (!ctx) return noop
  const { viewState } = ctx
  const { toggleOpen } = useSnapshot(viewState)
  return toggleOpen
}

const useCommandMenuSize = () => {
  const ctx = useCommandContext()
  if (!ctx) return 'small' as const
  const { viewState } = ctx
  const { size } = useSnapshot(viewState)
  return size
}

const useSetCommandMenuSize = (newSize: DialogSize) => {
  const ctx = useCommandContext()
  if (!ctx) return

  const { viewState } = ctx
  const { setSize, size } = useSnapshot(viewState)

  const originalSize = useRef(size)

  useLayoutEffect(() => {
    setSize(newSize)
    return () => setSize(originalSize.current)
  }, [setSize])
}

const useSetupCommandMenuTouchEvents = () => {
  const ctx = useCommandContext()
  if (!ctx) return noop as unknown as (handlers: ITouchHandlers) => void
  const { viewState } = ctx
  const { setTouchHandlers } = useSnapshot(viewState)

  return setTouchHandlers
}

const useCommandMenuTouchGestures = () => {
  const ctx = useCommandContext()
  if (!ctx) return undefined
  const { viewState } = ctx
  const { touchHandlers } = useSnapshot(viewState)

  return touchHandlers
}

export {
  useCommandMenuInitiated,
  useCommandMenuOpen,
  useSetCommandMenuOpen,
  useToggleCommandMenu,
  useCommandMenuSize,
  useSetCommandMenuSize,
  useSetupCommandMenuTouchEvents,
  useCommandMenuTouchGestures,
}
