import { bva } from "$ui/utils"
import type { FormPresenter } from "$ui/simple_form"

export const vertical = {
  root: bva('flex flex-col', {
    size: {
      sm: 'text-sm',
      default: '',
      lg: '',
    }
  }),

  group: bva('flex-auto', { }),
  label: bva('block mb-1 group-data-disabled:text-muted', { }),
  control: bva('flex-1', { }),
  error: bva('text-muted group-data-[state=invalid]:text-destructive', {})
} satisfies FormPresenter


export const horizontal = {
  root: bva('flex flex-col', {
    size: {
      sm: 'text-sm',
      default: '',
      lg: '',
    }
  }),

  group: bva('flex items-baseline mb-4 last:mb-0', { }),
  label: bva('block basis-32 text-end me-2 group-data-disabled:text-muted', { }),
  control: bva('flex-1 flex items-baseline', { }),
  error: bva('text-muted group-data-[state=invalid]:text-destructive', {})
} satisfies FormPresenter


export const inline = {
  root: bva('inline-flex flex-wrap items-center', {
    size: {
      sm: 'gap-2 text-sm',
      default: 'gap-3',
      lg: 'gap-3',
    }
  }),

  group: bva('inline-flex items-center', {
    size: {
      sm: 'gap-2',
      default: 'gap-2',
      lg: 'gap-3',
    }
  }),

  label: bva('shrink-0', { }),
  control: bva('flex-1', { }),
  error: bva('text-destructive', {})
} satisfies FormPresenter

declare module '$ui/simple_form' {
  interface FormPresenters {
    vertical: typeof vertical
    horizontal: typeof horizontal
    inline: typeof inline
  }
}
