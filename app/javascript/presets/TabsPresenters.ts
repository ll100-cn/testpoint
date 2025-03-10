import { bva } from "$ui/utils"
import type { TabsPresenter } from "$ui/tabs"

export const standard = {
  root: bva(``, {}),
  content: bva(`
    mt-2 ring-offset-background
    focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
  `, {}),
  list: bva('inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted', {}),
  trigger: bva(`
    inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all
    focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
    disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm
  `, {}),
} satisfies TabsPresenter
