import { bva } from "$ui/utils"
import type { DialogPresenter } from "$ui/dialog"

export const standard = {
  root: bva('', {}),
  content: bva(`
    z-50 grid w-full max-w-lg
    gap-4 border border-border bg-background p-6 shadow-lg duration-200
    sm:rounded-lg
  `, {
    scroll: {
      content: `
        fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[96dvh] overflow-auto
        data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0
        data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
        data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2
        data-[state=open]:slide-in-from-top-[48%]
      `,
      body: 'relative my-8',
    }
  }),
  footer: bva('flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-x-2 mt-2', {}),
  header: bva(`
    flex items-center
    *:data-role-actions:ms-auto
    *:data-role-inner:flex *:data-role-inner:flex-col *:data-role-inner:flex-1
    *:data-role-inner:*:last:mb-0
  `, {}),
  title: bva('', {}),
  description: bva('text-sm text-muted', {}),
  overlay: bva(`
    fixed inset-0 z-50 bg-black/80
    data-[state=open]:animate-in data-[state=closed]:animate-out
    data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
  `, {
    scroll: {
      body: 'grid place-items-center overflow-y-auto',
    }
  }),
  closeIcon: bva(`
    absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity
    hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2
    disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground
  `, {}),
} satisfies DialogPresenter
