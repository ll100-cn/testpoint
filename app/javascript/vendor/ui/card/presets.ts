import { bva } from '../utils'
import { type CardPresenter } from './types'

export const standard = {
  rounded: bva('rounded-md', { }),
  root: bva('border bg-card text-card-foreground relative flex flex-col', {}),
  header: bva('flex border-b p-4 relative items-center', {}),
  content: bva('p-4 grow', {}),
  footer: bva('flex border-t items-center p-4', {}),
} satisfies CardPresenter

