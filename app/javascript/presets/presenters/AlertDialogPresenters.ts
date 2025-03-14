import { bva } from "$ui/utils"
import type { AlertDialogPresenter } from "$ui/alert-dialog"

export const standard = {
  root: bva('', {}),
  content: bva(`
    fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2
    -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg duration-200
    data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0
    data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
    data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]
    data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg
  `, {}),
  description: bva('text-sm text-muted', {}),
  footer: bva('flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-x-2', {}),
  header: bva('flex flex-col gap-y-2 text-center sm:text-left', {}),
  title: bva('text-lg font-semibold', {}),
  cancel: bva('', {}),
  overlay: bva(`
    fixed inset-0 z-50 bg-black/80
    data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
  `, {}),
} satisfies AlertDialogPresenter
