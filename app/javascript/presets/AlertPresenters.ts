import { bva } from "$ui/utils"
import type { AlertPresenter } from "$ui/alert"

export const standard = {
  root: bva(`
    relative w-full rounded-lg border px-4 py-3
    [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-current [&>svg~*]:pl-7
    border-current/50 bg-current/10
  `, {
    variant: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      destructive: 'text-destructive',
      constructive: 'text-constructive',
      muted: 'text-muted',
      silence: 'text-silence',
      tint: '',
    },
  }),
  title: bva(`mb-1 font-medium leading-none tracking-tight`, { }),
  description: bva(`text-sm [&_p]:leading-relaxed`, { }),
} satisfies AlertPresenter
