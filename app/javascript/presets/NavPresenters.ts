import { bva } from "$ui/utils"
import type { NavPresenter } from "$ui/nav"

export const tabs = {
  list: bva('flex border-b -mb-px relative z-10', { }),
  item: bva(`
    rounded-t-md px-4 py-2 box-border -mb-px border border-transparent text-primary block
    hover:border-border
    disabled:text-silence disabled:border-transparent
    data-[state=active]:text-foreground data-[state=active]:bg-card data-[state=active]:border-border
    data-[state=active]:border-b-transparent
  `, { }),
} satisfies NavPresenter


export const pill = {
  list: bva('flex gap-2', { }),
  item: bva(`
    rounded-md px-3 py-2
    text-primary hover:text-foreground
    data-[state=active]:bg-primary data-[state=active]:text-primary-foreground
  `, {
    size: {
      xs: '',
      sm: '',
      default: '',
    }
  })
} satisfies NavPresenter


export const underline = {
  list: bva('-my-px flex gap-2', {}),
  item: bva(`
    inline-flex items-center text-foreground
    border-b-2 px-3 pt-[2px] border-transparent
    hover:border-transparent
    data-[state=active]:border-primary data-[state=active]:text-foreground
  `, { }),
} satisfies NavPresenter


export const navbar = {
  list: bva('-my-px flex gap-1', {}),
  item: bva(`
    inline-flex items-center text-foreground
    border-b-2 px-3 pt-[2px] border-transparent
    hover:border-transparent
    data-[state=active]:border-primary data-[state=active]:text-foreground
    [&>.icon]:me-3 [&>.icon]:-ms-0.5 [&>.icon]:text-silence
  `, { }),
} satisfies NavPresenter

declare module '$ui/nav' {
  interface NavPresenters {
    tabs: typeof tabs
    pill: typeof pill
    underline: typeof underline
    navbar: typeof navbar
  }
}
