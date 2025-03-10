import { bva } from "$ui/utils"

export const standard = {
  input: bva(`
    block w-full border border-input-border rounded text-foreground bg-input-background
    focus:border-primary/50 focus:ring-4 focus:ring-primary/25
    disabled:bg-muted/10
  `, {
    size: {
      sm: 'px-2 py-1 text-sm',
      default: 'px-3 py-1.5',
    }
  }),
  checkbox: bva(`
    disabled:bg-muted/10
  `, {
    size: {
      sm: 'p-0.5 text-sm',
      default: 'p-1',
    }
  })
}
