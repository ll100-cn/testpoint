import { bva } from '$ui/utils'
import { type ContainerPresenter } from '$ui/container'

export const fluid = {
  root: bva('px-4', {}),
} satisfies ContainerPresenter

export const fixed = {
  root: bva('px-4 mx-auto sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl', {
  }),
} satisfies ContainerPresenter

declare module '$ui/container' {
  interface ContainerPresenters {
    fixed: ContainerPresenter
  }
}
