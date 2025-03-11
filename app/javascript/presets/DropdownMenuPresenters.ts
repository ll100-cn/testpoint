import { bva } from "$ui/utils"
import type { DropdownMenuPresenter } from "$ui/dropdown-menu"

export const standard = {
  root: bva('', {}),
  checkboxItem: bva(`
    relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-hidden transition-colors
    focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50
  `, {}),
  content: bva(`
    z-50 min-w-32 overflow-hidden rounded-md border bg-popover-background p-1 text-popover-foreground shadow-md
    data-[state=open]:animate-in data-[state=closed]:animate-out
    data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
    data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
    data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2
  `, {}),
  group: bva('', {}),
  item: bva(`
    relative flex w-full select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors
    cursor-pointer !text-foreground
    focus:bg-accent focus:text-accent-foreground
    data-disabled:pointer-events-none data-disabled:opacity-50
  `, {}),
  label: bva(`
    px-2 py-1.5 text-sm
  `, {}),
  radioGroup: bva('', {}),
  radioItem: bva(`
    relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-hidden transition-colors
    focus:bg-accent focus:text-accent-foreground
    data-disabled:pointer-events-none data-disabled:opacity-50
  `, {}),
  separator: bva(`
    -mx-1 my-1 h-px bg-border
  `, {}),
  shortcut: bva(`
    ml-auto text-xs tracking-widest opacity-60
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
  `, {}),
  trigger: bva('outline-hidden', {}),
} satisfies DropdownMenuPresenter
