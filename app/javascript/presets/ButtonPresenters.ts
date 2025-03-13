import { bva, type VariantsConfig } from "$ui/utils"
import type { ButtonPresenter, ButtonPresenterConfig } from "$ui/button"

const base = `
  inline-flex items-center justify-center whitespace-nowrap border border-transparent font-medium transition-colors
  relative z-10 align-bottom cursor-pointer
  focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring
  disabled:pointer-events-none disabled:opacity-50
`
const variants = {
  size: {
    xs: 'h-6 px-2 text-xs data-[shape*=rounded]:rounded-xs',
    sm: 'h-7 px-3 text-xs',
    default: 'h-9 px-3 py-1.5',
    lg: 'h-10 rounded-md px-8 data-[shape*=rounded]:rounded-md',
  },
  shape: {
    rounded: 'rounded-sm ',
    pill: 'rounded-full',
    'square-rounded': 'aspect-square px-0 rounded-sm',
    circle: 'aspect-square px-0 rounded-full',
  },
} satisfies VariantsConfig<ButtonPresenterConfig>


export const standard = {
  root: bva(base, {
    ...variants,
    variant: {
      primary: 'bg-primary text-primary-foreground border-primary hover:bg-primary/80',
      secondary: 'bg-secondary text-secondary-foreground border-secondary hover:bg-secondary/80',
      muted: 'bg-muted text-muted-foreground hover:bg-muted/80',
      silence: 'bg-silence/15 text-silence-foreground hover:bg-silence/80',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
      constructive: 'bg-constructive text-constructive-foreground hover:bg-constructive/80',
      tint: 'bg-tint text-tint-foreground hover:bg-tint/80',
    },
  })
} satisfies ButtonPresenter


export const light = {
  root: bva(`${base}`, {
    ...variants,
    variant: {
      primary: 'bg-primary/20 text-primary hover:bg-primary/80 hover:text-primary-foreground',
      secondary: 'bg-secondary/20 text-secondary hover:bg-secondary/80 hover:text-secondary-foreground',
      muted: 'bg-muted/20 text-muted hover:bg-muted/80 hover:text-muted-foreground',
      silence: 'bg-silence/20 text-silence-foreground hover:bg-silence/80',
      destructive: 'bg-destructive/20 text-destructive hover:bg-destructive/80 hover:text-destructive-foreground',
      constructive: 'bg-constructive/20 text-constructive hover:bg-constructive/80 hover:text-constructive-foreground',
      tint: 'bg-tint/20 text-tint hover:bg-tint/80 hover:text-tint-foreground'
    },
  })
} satisfies ButtonPresenter


export const outline = {
  root: bva(base, {
    ...variants,
    variant: {
      primary: 'border border-primary text-primary hover:text-primary-foreground hover:bg-primary/80',
      secondary: 'border border-secondary text-secondary hover:text-secondary-foreground hover:bg-secondary/80',
      muted: 'border border-muted text-muted hover:text-muted-foreground hover:bg-muted/80',
      silence: 'border border-silence text-silence-foreground hover:bg-silence/20',
      destructive: 'border border-destructive text-destructive hover:text-destructive-foreground hover:bg-destructive/80',
      constructive: 'border border-constructive text-constructive hover:text-constructive-foreground hover:bg-constructive/80',
      tint: 'border border-tint text-tint hover:text-tint-foreground hover:bg-tint/80',
    },
  })
} satisfies ButtonPresenter


export const ghost = {
  root: bva(base, {
    ...variants,
    variant: {
      primary: 'text-primary hover:text-primary-foreground hover:bg-primary/60',
      secondary: 'text-secondary hover:text-secondary-foreground hover:bg-secondary/60',
      muted: 'text-muted hover:text-muted-foreground hover:bg-muted/60',
      silence: 'text-silence-foreground hover:bg-silence/60',
      destructive: 'text-destructive hover:text-destructive-foreground hover:bg-destructive/60',
      constructive: 'text-constructive hover:text-constructive-foreground hover:bg-constructive/60',
      tint: 'text-tint hover:text-tint-foreground hover:bg-tint/60',
    },
  })
} satisfies ButtonPresenter

declare module '$ui/button' {
  interface ButtonPresenters {
    light: typeof light
    outline: typeof outline
    ghost: typeof ghost
  }
}
