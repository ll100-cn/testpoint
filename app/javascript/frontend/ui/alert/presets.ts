import { bva } from "../utils"
import type { AlertPresenter } from "./types"

export const standard = {
  root: bva(`
    relative w-full rounded-lg border px-4 py-3 text-sm
    [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7
  `, {
    variant: {
      destructive: 'border-destructive/50 text-destructive bg-destructive/10 [&>svg]:text-destructive',
      tint: 'border-[color:hsl(var(--color-tint)/0.5)] text-[color:hsl(var(--color-tint))] bg-[color:hsl(var(--color-tint)/0.1)] [&>svg]:text-[color:hsl(var(--color-tint))]',
      primary: 'border-primary/50 text-primary bg-primary/10 [&>svg]:text-primary',
      secondary: 'border-secondary/50 text-secondary bg-secondary/10 [&>svg]:text-secondary',
      muted: 'border-muted/50 text-muted-foreground bg-muted/10 [&>svg]:text-muted-foreground',
    },
  }),
  description: bva(`text-sm [&_p]:leading-relaxed`, { }),
  title: bva(`mb-1 font-medium leading-none tracking-tight`, { }),
} satisfies AlertPresenter

