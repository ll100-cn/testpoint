import { bva } from "$ui/utils"
import type { TablePresenter } from "$ui/table"

export const standard = {
  root: bva('w-full caption-bottom', { }),
  header: bva('[&_tr]:border-b', { }),
  body: bva('[&_tr:last-child]:border-0', { }),
  row: bva('border-b transition-colors hover:bg-muted/10 data-[state=selected]:bg-muted', { }),
  head: bva('h-10 px-2 text-left align-middle font-medium text-muted [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-0.5', { }),
  cell: bva('p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-0.5', { }),
} satisfies TablePresenter


export const bordered = {
  root: bva('w-full caption-bottom', { }),
  header: bva('[&_tr]:border-b', { }),
  body: bva('[&_tr:last-child]:border-0', { }),
  row: bva('border-b transition-colors hover:bg-muted/10 data-[state=selected]:bg-muted', { }),
  head: bva(`
    h-10 px-2 text-left align-middle font-medium text-muted border-e last:border-e-0
    [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-0.5
  `, { }),
  cell: bva(`
  p-2 align-middle border-e last:border-e-0
  [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-0.5
`, { }),
} satisfies TablePresenter

declare module '$ui/table' {
  interface TablePresenters {
    bordered: typeof bordered
  }
}
