import { bva } from "$vendor/ui/utils"

export const standard = {
  input: bva(`
    block w-full border border-input rounded text-foreground bg-white
    focus:border-primary/50 focus:ring-4 focus:ring-primary/25
  `, {
    size: {
      sm: '!px-2 !py-1 text-sm',
      default: '!px-3 !py-1.5',
    }
  })
}