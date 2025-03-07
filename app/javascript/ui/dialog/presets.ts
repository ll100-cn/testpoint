import { bva } from "../utils"
import type { DialogPresenter } from "./types"

export const standard = {
  root: bva('', {}),
  content: bva(`
    fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2
    -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg duration-200
    max-h-[96dvh] overflow-auto
    data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0
    data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
    data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2
    data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg
  `, {}),
  description: bva('text-sm text-muted-foreground', {}),
  footer: bva('flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-x-2 mt-2', {}),
  header: bva('flex gap-y-1.5 text-center sm:text-left items-center', {}),
  scrollContent: bva('relative z-50 grid w-full max-w-lg my-8 gap-4 border border-border bg-background p-6 shadow-lg duration-200 sm:rounded-lg md:w-full', {}),
  title: bva('text-lg font-semibold leading-none tracking-tight mb-0', {})
} satisfies DialogPresenter
