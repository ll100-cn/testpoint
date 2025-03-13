import { bva, cn, type VariantsConfig } from "$ui/utils"
import type { BadgePresenter, BadgePresenterConfig } from "$ui/badge"

const base = `
  inline-flex items-center border font-semibold transition-colors
  focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2
  border-transparent
`

const variants = {
  shape: {
    rounded: 'rounded-sm',
    pill: 'rounded-full',
  },
  size: {
    sm: 'px-1 py-0.25 text-xs',
    default: 'px-2.5 py-0.75 text-xs',
    lg: 'px-3 py-1 text-sm',
  },
} satisfies VariantsConfig<BadgePresenterConfig>


export const standard = {
  root: bva(base, {
    ...variants,
    variant: {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/80',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
      constructive: 'bg-constructive text-constructive-foreground hover:bg-constructive/80',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      muted: 'bg-muted text-muted-foreground hover:bg-muted/80',
      silence: 'bg-silence text-silence-foreground hover:bg-silence/80',
      tint: 'bg-tint hover:bg-tint/80',
    },
  })
} satisfies BadgePresenter


export const light = {
  root: bva(`${base} bg-current/10 hover:border-current`, {
    ...variants,
    variant: {
      primary: 'text-primary',
      destructive: 'text-destructive',
      constructive: 'text-constructive',
      secondary: 'text-secondary',
      muted: 'text-muted',
      silence: 'text-silence',
      tint: 'text-tint',
    },
  })
} satisfies BadgePresenter


export const outline = {
  root(config) { return cn(light.root(config), 'bg-transparent border-current hover:bg-current/10') }
} satisfies BadgePresenter

declare module '$ui/badge' {
  interface BadgePresenters {
    light: typeof light
    outline: typeof outline
  }
}
