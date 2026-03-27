import { bva } from "$ui/utils"
import type { ButtonGroupPresenter } from "$ui/button-group"

export const standard = {
  root: bva(`
    flex [&>*:not(:last-child)]:rounded-e-none
    [&>*:not(:last-child)]:border-e-0 [&>*:not(:last-child)]:-me-px [&>*:not(:first-child)]:rounded-s-none
  `, {})
} satisfies ButtonGroupPresenter
