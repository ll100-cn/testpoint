import { createProvideInject } from "$ui/utils"

export interface ContainerPresenters {
}

export const {
  useInject: useContainerPresenters,
  useProvide: provideContainerPresenters
} = createProvideInject<ContainerPresenters>('container-presenters')
