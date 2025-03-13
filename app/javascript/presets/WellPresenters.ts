import { bva } from "$ui/utils"
import type { WellPresenter } from "$ui/well"

export const standard = {
  root: bva(``, {
    variant: {
      muted: 'bg-muted/5',
      primary: 'bg-primary/15',
      destructive: 'bg-destructive/5',
    },
  }),
} satisfies WellPresenter
