import { bva } from "$ui/utils"
import type { SeparatorPresenter } from "$ui/separator"

export const standard = {
  root: bva('shrink-0 bg-border relative', {}),
  label: bva('text-xs text-muted-foreground bg-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center', {}),
} satisfies SeparatorPresenter

export const through = {
  root: bva('shrink-0 bg-border after:absolute after:inset-x-0 after:h-px after:bg-border', {}),
  label: bva('text-xs text-muted-foreground bg-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center', {}),
} satisfies SeparatorPresenter

declare module '$ui/separator' {
  interface SeparatorPresenters {
    through: typeof through
  }
}
