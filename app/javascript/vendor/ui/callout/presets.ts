import { bva } from "../utils"
import type { CalloutPresenter } from "./types"

export const standard = {
  root: bva(`
    relative w-full px-4 py-3 text-sm border-l-4
  `, {
    variant: {
      destructive: 'border-destructive/50 text-destructive bg-destructive/10 [&>svg]:text-destructive',
    },
  }),
  description: bva(`text-sm [&_p]:leading-relaxed`, { }),
  title: bva(`mb-1 font-medium leading-none tracking-tight`, { }),
} satisfies CalloutPresenter

