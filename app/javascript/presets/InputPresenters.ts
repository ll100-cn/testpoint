import { type InputPresenter, type InputPresenterConfig } from '$ui/input'
import { bva, cn } from '$ui/utils'

export const standard = {
  checkbox: bva(`
    peer size-4 shrink-0 rounded-sm border border-primary shadow-sm text-primary
    focus:outline-hidden focus:border-ring/50 focus:ring-4 focus:ring-ring/25
    disabled:cursor-not-allowed disabled:bg-silence/10

    relative *:data-[role=indicator]:absolute *:data-[role=indicator]:inset-0 *:data-[role=indicator]:stroke-3
    *:data-[role=indicator]:flex *:data-[role=indicator]:items-center *:data-[role=indicator]:justify-center

    data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground
    group-data-[state=invalid]:border-destructive
  `, {}),

  radio(config: Partial<InputPresenterConfig>) {
    return cn(this.checkbox(config), 'rounded-full')
  },

  input: bva(`
    block w-full border border-input-border rounded-sm text-foreground bg-input-background
    focus:border-ring/50 focus:ring-4 focus:ring-ring/25
    data-focus:border-ring/50 data-focus:ring-4 data-focus:ring-ring/25
    disabled:bg-silence/10
    group-data-[state=invalid]:!border-destructive
    placeholder:text-muted data-placeholder:text-muted
  `, {
    size: {
      sm: 'px-2 py-1 text-sm',
      default: 'px-3 py-1.5',
    }
  }),

  select(config: Partial<InputPresenterConfig>) {
    return cn(this.input(config), '')
  },
} satisfies InputPresenter

declare module '$ui/input' {
  interface InputPresenters { }
}
