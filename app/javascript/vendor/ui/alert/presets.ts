import { bva } from "../utils"
import type { AlertPresenter } from "./types"

export const standard = {
  root: bva(`
    relative w-full rounded-lg border px-4 py-3 text-sm
    [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7
  `, {
    variant: {
      destructive: 'border-destructive/50 text-destructive bg-destructive/10 [&>svg]:text-destructive',
    },
  }),
  description: bva(`text-sm [&_p]:leading-relaxed`, { }),
  title: bva(`mb-1 font-medium leading-none tracking-tight`, { }),
} satisfies AlertPresenter

