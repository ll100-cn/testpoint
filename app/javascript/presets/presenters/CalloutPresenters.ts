import { bva } from "$ui/utils"
import type { CalloutPresenter } from "$ui/callout"

export const standard = {
  root: bva(`
    relative w-full px-4 py-3 text-sm border-l-4
  `, {
    variant: {
      destructive: 'border-destructive/50 text-destructive bg-destructive/10 [&>svg]:text-destructive',
      secondary: 'border-secondary/50 text-secondary bg-secondary/10 [&>svg]:text-secondary',
      muted: 'border-muted/50 text-muted bg-muted/10 [&>svg]:text-muted',
      tint: 'border-[color:hsl(var(--color-tint)/0.5)] text-[color:hsl(var(--color-tint))] bg-[color:hsl(var(--color-tint)/0.1)] [&>svg]:text-[color:hsl(var(--color-tint))]',
    },
  }),
  description: bva(`text-sm [&_p]:leading-relaxed`, { }),
  title: bva(`mb-1 font-medium leading-none tracking-tight`, { }),
} satisfies CalloutPresenter
