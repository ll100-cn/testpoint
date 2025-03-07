import { cva } from 'class-variance-authority'
import * as _ from 'radash'
import { type Ref } from 'vue'
import { createProvideInject, createRelayPreseterConfig } from '../utils'

export interface BadgePresenterConfig {
  variant?: 'primary' | 'secondary' | 'muted' | 'silence' | 'destructive' | 'successful' | 'tint'
}

export type BadgePresenter = {
  root: (config: Partial<BadgePresenterConfig>) => string
}

export const {
  relayInjectPreseterConfig: relayBadgePreseterConfig
} = createRelayPreseterConfig<BadgePresenterConfig>('badge-presenter-config', {
  variant: 'primary'
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
} = createProvideInject<BadgePresenters>('Badge-presenters')
