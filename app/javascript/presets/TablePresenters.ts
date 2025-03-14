import { bva, cn } from "$ui/utils"
import type { TablePresenter } from "$ui/table"

export const base = {
  root: bva('w-full caption-bottom border-border', { }),
  header: bva('', { }),
  body: bva('*:last:border-b-0', { }),
  caption: bva('mt-4 text-sm text-muted', {}),
  row: bva('transition-colors hover:bg-accent data-[state=selected]:bg-accent', { }),
  head: bva(`
    h-10 px-2 text-start align-middle font-medium text-muted
    data-role-checkbox:pe-0
    data-role-actions:text-end
  `, { }),
  cell: bva(`
    p-2 align-middle
    data-role-checkbox:pe-0
    data-role-actions:space-x-3 data-role-actions:text-end
  `, { }),
  footer: bva('bg-board-background font-medium *:last:border-b-0', {}),
  empty: bva(`
    p-4 whitespace-nowrap align-middle text-sm text-foreground
    *:data-part-inner:center-center *:data-part-inner:py-10
  `, {}),
} satisfies TablePresenter

export const standard = {
  ...base,
  row(config) { return cn(base.row(config), 'border-b') },
  footer(config) { return cn(base.footer(config), 'border-t') },
} satisfies TablePresenter

export const bordered = {
  ...base,
  root(config) { return cn(base.root(config), 'border-t border-s') },
  head(config) { return cn(base.head(config), 'border-e border-b') },
  cell(config) { return cn(base.cell(config), 'border-e border-b') },
} satisfies TablePresenter

declare module '$ui/table' {
  interface TablePresenters {
    bordered: typeof bordered
  }
}
