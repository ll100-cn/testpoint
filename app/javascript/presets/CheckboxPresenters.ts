import { bva } from "$ui/utils"
import type { CheckboxPresenter } from "$ui/checkbox"

export const standard = {
  root: bva(`
    peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow
    focus-visible:outline-hidden focus-visible:ring-4 focus-visible:ring-ring/50
    disabled:cursor-not-allowed disabled:opacity-50
    data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground
  `, {}),
  indicator: bva('flex h-full w-full items-center justify-center text-current', {}),
} satisfies CheckboxPresenter
