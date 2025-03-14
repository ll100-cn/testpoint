import { bva } from "$ui/utils"
import type { DropdownMenuPresenter } from "$ui/dropdown-menu"

export const standard = {
  root: bva('', {}),
  content: bva(`
    z-50 min-w-32 overflow-hidden rounded-md border bg-popover-background p-1 text-popover-foreground shadow-md
    data-[state=open]:animate-in data-[state=closed]:animate-out
    data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
    data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
    data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2
  `, {}),
  item: bva(`
    relative flex w-full select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors
    cursor-pointer !text-foreground
    focus:bg-accent focus:text-accent-foreground
    data-disabled:pointer-events-none data-disabled:opacity-50
    data-inset:pl-8
    *:data-part-indicator:absolute *:data-part-indicator:left-2 *:data-part-indicator:size-3.5
    *:data-part-indicator:center-center
  `, {}),
  label: bva(`
    px-2 py-1.5 text-sm
    data-inset:pl-8
    data-role-default:font-semibold
  `, {}),
  separator: bva(`
    -mx-1 my-1 h-px bg-border border-border
  `, {}),
  subContent: bva(`
    z-50 min-w-32 overflow-hidden rounded-md border bg-popover-background p-1 text-popover-foreground shadow-md
    data-[state=open]:animate-in data-[state=closed]:animate-out
    data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
    data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
    data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2
  `, {}),
  sub: bva('', {}),
  subTrigger: bva(`
    flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent
    *:data-part-indicator:ml-auto *:data-part-indicator:size-4
    *:data-part-indicator:stroke-2
  `, {}),
  trigger: bva('outline-hidden', {}),
} satisfies DropdownMenuPresenter
