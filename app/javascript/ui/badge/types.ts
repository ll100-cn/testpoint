import { type Ref } from "vue"
import { createProvideInject, createRelayPresenterConfig } from '../utils'

export interface BadgePresenterConfig {
  variant?: 'primary' | 'secondary' | 'muted' | 'silence' | 'destructive' | 'constructive' | 'tint'
  size?: 'default' | 'sm' | 'lg'
  shape?: 'pill' | 'rounded'
}

export type BadgePresenter = {
  root: (config: Partial<BadgePresenterConfig>) => string
}

export const {
  relayInjectPresenterConfig: relayBadgePresenterConfig
} = createRelayPresenterConfig<BadgePresenterConfig>('badge-presenter-config', {
  variant: 'primary',
  size: 'default',
  shape: 'rounded',
})

export const {
  useInject: useBadgePresenter,
  useProvide: provideBadgePresenter
} = createProvideInject<Ref<BadgePresenter>>('badge-presenter')

export interface BadgePresenters {
  standard: BadgePresenter
}

export const {
  useInject: useBadgePresenters,
  useProvide: provideBadgePresenters
} = createProvideInject<BadgePresenters>('badge-presenters')
