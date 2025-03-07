import { bva } from "../utils"
import type { SelectPresenter } from "./types"

export const standard = {
  root: bva('', {}),
  content: bva(`
    relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md
    data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
    data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
    data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2
  `, {}),
  group: bva('p-1 w-full', {}),
  item: bva(`
    relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none
    focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50
  `, {}),
  label: bva('px-2 py-1.5 text-sm font-semibold', {}),
  scrollUpButton: bva('flex cursor-default items-center justify-center py-1', {}),
  scrollDownButton: bva('flex cursor-default items-center justify-center py-1', {}),
  separator: bva('-mx-1 my-1 h-px bg-muted', {}),
  trigger: bva(`
    flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background
    placeholder:text-muted
    focus:outline-none focus:ring-1 focus:ring-ring
    disabled:cursor-not-allowed disabled:opacity-50
    [&>span]:line-clamp-1
  `, {}),
} satisfies SelectPresenter
