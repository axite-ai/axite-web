'use client'

import { createContext, useContext } from 'react'

import { type ICommandsState } from '../internal/types'
import { type IPagesState } from '../internal/state/pagesState'
import { type IQueryState } from '../internal/state/queryState'
import { type IViewState } from '../internal/state/viewState.types'

const CommandContext = createContext<
  | {
      commandsState: ICommandsState
      pagesState: IPagesState
      queryState: IQueryState
      viewState: IViewState
    }
  | undefined
>(undefined)

const useCommandContext = () => {
  const ctx = useContext(CommandContext)
  // Return undefined instead of throwing - allows hooks to be used outside CommandProvider
  // This is needed for standalone marketing sites that don't use the command menu
  return ctx
}

export { CommandContext, useCommandContext }
