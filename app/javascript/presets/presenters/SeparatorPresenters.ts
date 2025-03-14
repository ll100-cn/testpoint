import { bva } from "$ui/utils"
import type { SeparatorPresenter } from "$ui/separator"

export const standard = {
  root: bva('shrink-0 bg-border relative', {
    orientation: {
      horizontal: 'h-px w-full',
      vertical: 'h-full w-px',
    },
  }),
  label: bva('text-xs text-muted-foreground bg-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center', {
    orientation: {
      horizontal: 'w-[1px] px-1 py-2',
      vertical: 'h-[1px] py-1 px-2',
    },
  }),
} satisfies SeparatorPresenter

export const through = {
  root: bva('shrink-0 bg-border after:absolute after:inset-x-0 after:h-px after:bg-border', {
    orientation: {
      horizontal: 'h-px w-full',
      vertical: 'h-full w-px',
    },
  }),
  label: bva('text-xs text-muted-foreground bg-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center', {
    orientation: {
      horizontal: 'w-[1px] px-1 py-2',
      vertical: 'h-[1px] py-1 px-2',
    },
  }),
} satisfies SeparatorPresenter

declare module '$ui/separator' {
  interface SeparatorPresenters {
    through: typeof through
  }
}
