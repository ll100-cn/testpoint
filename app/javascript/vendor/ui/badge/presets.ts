import { bva } from "../utils"
import type { BadgePresenter } from "./types"

const base = `
  inline-flex items-center rounded border px-2.5 py-0.5 text-xs font-semibold transition-colors
  focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
`

export const standard = {
  root: bva(base, {
    variant: {
      primary: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
      secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
      destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
      successful: 'border-transparent bg-green-600 text-destructive-foreground hover:bg-green-600/80',
    },
  })
} satisfies BadgePresenter


export const light = {
  root: bva(base, {
    variant: {
      primary: 'border-transparent text-primary bg-primary/10 hover:border-primary',
      secondary: 'border-transparent text-secondary bg-secondary/10 hover:border-secondary',
      destructive: 'border-transparent text-destructive bg-destructive/10 hover:border-destructive',
    },
  })
} satisfies BadgePresenter


export const outline = {
  root: bva(base, {
    variant: {
      primary: 'text-foreground'
    },
  })
} satisfies BadgePresenter

