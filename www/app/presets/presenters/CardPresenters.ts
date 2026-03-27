import { bva } from "$ui/utils"
import type { CardPresenter } from "$ui/card"

export const standard = {
  root: bva('rounded-md border border-border bg-card-background text-card-foreground relative flex flex-col', {}),
  header: bva(`
    flex bg-board-background border-b px-4 py-2 relative items-center rounded-t-md
    *:data-part-inner:flex *:data-part-inner:items-center *:data-part-inner:w-auto
    *:data-part-actions:ms-auto *:data-part-actions:flex *:data-part-actions:gap-x-1
  `, {}),
  footer: bva('flex rounded-b-md bg-board-background gap-2 border-t items-center px-4 py-2', {}),
  content: bva(`
    px-4 py-4 grow
  `, {}),
  table: bva('[&_tr>*]:first:ps-4 [&_tr>*]:last:pe-4', {}),
  description: bva('text-sm text-muted', {}),
  title: bva('', {}),
  topState: bva(`
    h-1 absolute top-0 w-full bg-current rounded-t-md
    before:absolute before:size-full before:-translate-x-full before:bg-clip-content
    after:absolute after:size-full after:bg-clip-content
  `, {}),
} satisfies CardPresenter
