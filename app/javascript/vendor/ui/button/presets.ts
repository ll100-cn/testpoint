import { bva } from "../utils"
import type { ButtonPresenter } from "./types"

const base = `
  inline-flex items-center justify-center whitespace-nowrap border border-transparent rounded font-medium transition-colors
  relative z-10 align-bottom
  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
  disabled:pointer-events-none disabled:opacity-50
`
const size = {
  xs: 'h-6 rounded-sm px-2 text-xs',
  sm: 'h-7 rounded px-3 text-xs',
  default: '!px-3 !py-1.5',
  lg: 'h-10 rounded-md px-8',
}


export const standard = {
  root: bva(base, {
    size,
    variant: {
      primary: 'bg-primary text-primary-foreground border-primary hover:bg-primary/80',
      secondary: 'bg-secondary text-secondary-foreground border-secondary hover:bg-secondary/80',
      muted: 'bg-muted text-muted-foreground hover:bg-muted/80',
      silence: 'bg-silence/15 text-silence-foreground hover:bg-silence/80',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
      tint: 'bg-[color:hsl(var(--color-tint))] text-primary-foreground hover:bg-[color:hsl(var(--color-tint)/0.8)]',
    },
  })
} satisfies ButtonPresenter


export const light = {
  root: bva(base, {
    size,
    variant: {
      primary: 'bg-primary/20 text-primary hover:bg-primary/80 hover:text-primary-foreground',
      secondary: 'bg-secondary/20 text-secondary hover:bg-secondary/80 hover:text-secondary-foreground',
      muted: 'bg-muted/20 text-muted hover:bg-muted/80 hover:text-muted-foreground',
      silence: 'bg-silence/20 text-silence-foreground hover:bg-silence/80',
      destructive: 'bg-destructive/20 text-destructive hover:bg-destructive/80 hover:text-destructive-foreground',
      tint: 'bg-[color:hsl(var(--color-tint)/0.2)] text-[color:hsl(var(--color-tint))] hover:bg-[color:hsl(var(--color-tint)/0.8)] hover:text-primary-foreground'
    },
  })
} satisfies ButtonPresenter


export const outline = {
  root: bva(base, {
    size,
    variant: {
      primary: 'border border-primary text-primary hover:text-primary-foreground hover:bg-primary/80',
      secondary: 'border border-secondary text-secondary hover:text-secondary-foreground hover:bg-secondary/80',
      muted: 'border border-muted text-muted hover:text-muted-foreground hover:bg-muted/80',
      silence: 'border border-silence text-silence-foreground hover:bg-silence/20',
      destructive: 'border border-destructive text-destructive hover:text-destructive-foreground hover:bg-destructive/80',
      tint: 'border border-[color:hsl(var(--color-tint))] text-[color:hsl(var(--color-tint))] hover:text-white hover:bg-[color:hsl(var(--color-tint)/0.8)]',
    },
  })
} satisfies ButtonPresenter


export const ghost = {
  root: bva(base, {
    size,
    variant: {
      primary: 'text-primary hover:text-primary-foreground hover:bg-primary/60',
      secondary: 'text-secondary hover:text-secondary-foreground hover:bg-secondary/60',
      destructive: 'text-destructive hover:text-destructive-foreground hover:bg-destructive/60',
      muted: 'text-muted hover:text-muted-foreground hover:bg-muted/50',
    },
  })
} satisfies ButtonPresenter
