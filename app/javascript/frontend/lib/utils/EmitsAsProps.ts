export type EmitsAsProps<T extends Record<string, any[]>> = {
  [K in keyof T as `on${Capitalize<string & K>}`]?: (...args: T[K]) => void
}