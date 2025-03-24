import { type SelectPresenter } from '$ui/select'
import { bva, cn } from '$ui/utils'

import * as inputPresenters from './InputPresenters'

const inputStandard = inputPresenters.standard

export const standard = {
  trigger(config) {
    return cn(inputStandard.select(config), 'flex items-center justify-between stroke-2')
  },
  content: bva(`
    relative z-50
    max-h-[var(--reka-select-content-available-height)]
    min-w-[var(--reka-select-trigger-width)]
    overflow-y-auto overflow-x-hidden
    rounded-md border border-neutral-200 bg-white text-neutral-950 shadow-md
    data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0
    data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
    data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2
    data-[side=top]:slide-in-from-bottom-2 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50
    data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1
  `, {}),

  item: bva(`
    relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pr-8 text-sm
    outline-none focus:bg-neutral-100 focus:text-neutral-900
    data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-neutral-800 dark:focus:text-neutral-50
    pl-4
    stroke-2
    data-inset:pl-8

    *:data-part-marker:me-1
    *:data-part-indicator:absolute *:data-part-indicator:right-3
  `, {}),

  group: bva(`w-full`, {}),

  label: bva(`px-2 py-1.5 text-sm font-semibold text-muted`, {}),
  separator: bva(`-mx-1 my-1 h-px bg-neutral-100 dark:bg-neutral-800`, {}),
} satisfies SelectPresenter

declare module '$ui/select' {
  interface SelectPresenters {
  }
}
