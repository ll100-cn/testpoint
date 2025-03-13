
import { type Ref } from "vue"
import { createProvideInject, createRelayPresenterConfig } from '../utils'

export interface ContainerPresenterConfig {
}

export type ContainerPresenter = {
  root: (config: Partial<ContainerPresenterConfig>) => string
}

export interface ContainerPresenters {
  fluid: ContainerPresenter
}

export const {
  relayInjectPresenterConfig: relayContainerPresenterConfig
} = createRelayPresenterConfig<ContainerPresenterConfig>('container-presenter-config', {
})

export const {
  useInject: useContainerPresenter,
  useProvide: provideContainerPresenter
} = createProvideInject<Ref<ContainerPresenter>>('container-presenter')

export const {
  useInject: useContainerPresenters,
  useProvide: provideContainerPresenters
} = createProvideInject<ContainerPresenters>('container-presenters')
