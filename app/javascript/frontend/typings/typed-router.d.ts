/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

/// <reference types="unplugin-vue-router/client" />

import type {
  // type safe route locations
  RouteLocationTypedList,
  RouteLocationResolvedTypedList,
  RouteLocationNormalizedTypedList,
  RouteLocationNormalizedLoadedTypedList,
  RouteLocationAsString,
  RouteLocationAsRelativeTypedList,
  RouteLocationAsPathTypedList,

  // helper types
  // route definitions
  RouteRecordInfo,
  ParamValue,
  ParamValueOneOrMore,
  ParamValueZeroOrMore,
  ParamValueZeroOrOne,

  // vue-router extensions
  _RouterTyped,
  RouterLinkTyped,
  RouterLinkPropsTyped,
  NavigationGuard,
  UseLinkFnTyped,

  // data fetching
  _DataLoader,
  _DefineLoaderOptions,
} from 'unplugin-vue-router/types'

declare module 'vue-router/auto/routes' {
  export interface RouteNamedMap {
    '/': RouteRecordInfo<'/', '/', Record<never, never>, Record<never, never>>,
    '/dashboard/': RouteRecordInfo<'/dashboard/', '/dashboard', Record<never, never>, Record<never, never>>,
    '/error': RouteRecordInfo<'/error', '/error', Record<never, never>, Record<never, never>>,
    '/issues/': RouteRecordInfo<'/issues/', '/issues', Record<never, never>, Record<never, never>>,
    '/projects/': RouteRecordInfo<'/projects/', '/projects', Record<never, never>, Record<never, never>>,
    '/projects/[project_id]/categories/': RouteRecordInfo<'/projects/[project_id]/categories/', '/projects/:project_id/categories', { project_id: ParamValue<true> }, { project_id: ParamValue<false> }>,
    '/projects/[project_id]/categories/[category_id].edit': RouteRecordInfo<'/projects/[project_id]/categories/[category_id].edit', '/projects/:project_id/categories/:category_id/edit', { project_id: ParamValue<true>, category_id: ParamValue<true> }, { project_id: ParamValue<false>, category_id: ParamValue<false> }>,
    '/projects/[project_id]/categories/new': RouteRecordInfo<'/projects/[project_id]/categories/new', '/projects/:project_id/categories/new', { project_id: ParamValue<true> }, { project_id: ParamValue<false> }>,
    '/projects/[project_id]/edit': RouteRecordInfo<'/projects/[project_id]/edit', '/projects/:project_id/edit', { project_id: ParamValue<true> }, { project_id: ParamValue<false> }>,
    '/projects/[project_id]/issue_templates/': RouteRecordInfo<'/projects/[project_id]/issue_templates/', '/projects/:project_id/issue_templates', { project_id: ParamValue<true> }, { project_id: ParamValue<false> }>,
    '/projects/[project_id]/issue_templates/[issue_template_id].edit': RouteRecordInfo<'/projects/[project_id]/issue_templates/[issue_template_id].edit', '/projects/:project_id/issue_templates/:issue_template_id/edit', { project_id: ParamValue<true>, issue_template_id: ParamValue<true> }, { project_id: ParamValue<false>, issue_template_id: ParamValue<false> }>,
    '/projects/[project_id]/issue_templates/new': RouteRecordInfo<'/projects/[project_id]/issue_templates/new', '/projects/:project_id/issue_templates/new', { project_id: ParamValue<true> }, { project_id: ParamValue<false> }>,
    '/projects/[project_id]/issues/': RouteRecordInfo<'/projects/[project_id]/issues/', '/projects/:project_id/issues', { project_id: ParamValue<true> }, { project_id: ParamValue<false> }>,
    '/projects/[project_id]/members/': RouteRecordInfo<'/projects/[project_id]/members/', '/projects/:project_id/members', { project_id: ParamValue<true> }, { project_id: ParamValue<false> }>,
    '/projects/[project_id]/members/[member_id].edit': RouteRecordInfo<'/projects/[project_id]/members/[member_id].edit', '/projects/:project_id/members/:member_id/edit', { project_id: ParamValue<true>, member_id: ParamValue<true> }, { project_id: ParamValue<false>, member_id: ParamValue<false> }>,
    '/projects/[project_id]/members/new': RouteRecordInfo<'/projects/[project_id]/members/new', '/projects/:project_id/members/new', { project_id: ParamValue<true> }, { project_id: ParamValue<false> }>,
    '/projects/[project_id]/milestones/': RouteRecordInfo<'/projects/[project_id]/milestones/', '/projects/:project_id/milestones', { project_id: ParamValue<true> }, { project_id: ParamValue<false> }>,
    '/projects/[project_id]/milestones/[milestone_id].edit': RouteRecordInfo<'/projects/[project_id]/milestones/[milestone_id].edit', '/projects/:project_id/milestones/:milestone_id/edit', { project_id: ParamValue<true>, milestone_id: ParamValue<true> }, { project_id: ParamValue<false>, milestone_id: ParamValue<false> }>,
    '/projects/[project_id]/milestones/new': RouteRecordInfo<'/projects/[project_id]/milestones/new', '/projects/:project_id/milestones/new', { project_id: ParamValue<true> }, { project_id: ParamValue<false> }>,
    '/projects/[project_id]/plans/': RouteRecordInfo<'/projects/[project_id]/plans/', '/projects/:project_id/plans', { project_id: ParamValue<true> }, { project_id: ParamValue<false> }>,
    '/projects/[project_id]/plans/[plan_id]': RouteRecordInfo<'/projects/[project_id]/plans/[plan_id]', '/projects/:project_id/plans/:plan_id', { project_id: ParamValue<true>, plan_id: ParamValue<true> }, { project_id: ParamValue<false>, plan_id: ParamValue<false> }>,
    '/projects/[project_id]/plans/[plan_id].edit': RouteRecordInfo<'/projects/[project_id]/plans/[plan_id].edit', '/projects/:project_id/plans/:plan_id/edit', { project_id: ParamValue<true>, plan_id: ParamValue<true> }, { project_id: ParamValue<false>, plan_id: ParamValue<false> }>,
    '/projects/[project_id]/platforms/': RouteRecordInfo<'/projects/[project_id]/platforms/', '/projects/:project_id/platforms', { project_id: ParamValue<true> }, { project_id: ParamValue<false> }>,
    '/projects/[project_id]/platforms/[platform_id].edit': RouteRecordInfo<'/projects/[project_id]/platforms/[platform_id].edit', '/projects/:project_id/platforms/:platform_id/edit', { project_id: ParamValue<true>, platform_id: ParamValue<true> }, { project_id: ParamValue<false>, platform_id: ParamValue<false> }>,
    '/projects/[project_id]/platforms/new': RouteRecordInfo<'/projects/[project_id]/platforms/new', '/projects/:project_id/platforms/new', { project_id: ParamValue<true> }, { project_id: ParamValue<false> }>,
    '/projects/[project_id]/test_case_labels/': RouteRecordInfo<'/projects/[project_id]/test_case_labels/', '/projects/:project_id/test_case_labels', { project_id: ParamValue<true> }, { project_id: ParamValue<false> }>,
    '/projects/[project_id]/test_case_labels/[test_case_label_id].edit': RouteRecordInfo<'/projects/[project_id]/test_case_labels/[test_case_label_id].edit', '/projects/:project_id/test_case_labels/:test_case_label_id/edit', { project_id: ParamValue<true>, test_case_label_id: ParamValue<true> }, { project_id: ParamValue<false>, test_case_label_id: ParamValue<false> }>,
    '/projects/[project_id]/test_case_labels/new': RouteRecordInfo<'/projects/[project_id]/test_case_labels/new', '/projects/:project_id/test_case_labels/new', { project_id: ParamValue<true> }, { project_id: ParamValue<false> }>,
    '/projects/[project_id]/test_cases/': RouteRecordInfo<'/projects/[project_id]/test_cases/', '/projects/:project_id/test_cases', { project_id: ParamValue<true> }, { project_id: ParamValue<false> }>,
    '/projects/new': RouteRecordInfo<'/projects/new', '/projects/new', Record<never, never>, Record<never, never>>,
    '/users/': RouteRecordInfo<'/users/', '/users', Record<never, never>, Record<never, never>>,
    '/users/[user_id]/edit': RouteRecordInfo<'/users/[user_id]/edit', '/users/:user_id/edit', { user_id: ParamValue<true> }, { user_id: ParamValue<false> }>,
    '/users/new': RouteRecordInfo<'/users/new', '/users/new', Record<never, never>, Record<never, never>>,
  }
}

declare module 'vue-router/auto' {
  import type { RouteNamedMap } from 'vue-router/auto/routes'

  export type RouterTyped = _RouterTyped<RouteNamedMap>

  /**
   * Type safe version of `RouteLocationNormalized` (the type of `to` and `from` in navigation guards).
   * Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationNormalized<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationNormalizedTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of `RouteLocationNormalizedLoaded` (the return type of `useRoute()`).
   * Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationNormalizedLoaded<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationNormalizedLoadedTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of `RouteLocationResolved` (the returned route of `router.resolve()`).
   * Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationResolved<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationResolvedTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of `RouteLocation` . Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocation<Name extends keyof RouteNamedMap = keyof RouteNamedMap> = RouteLocationTypedList<RouteNamedMap>[Name]

  /**
   * Type safe version of `RouteLocationRaw` . Allows passing the name of the route to be passed as a generic.
   */
  export type RouteLocationRaw<Name extends keyof RouteNamedMap = keyof RouteNamedMap> =
    | RouteLocationAsString<RouteNamedMap>
    | RouteLocationAsRelativeTypedList<RouteNamedMap>[Name]
    | RouteLocationAsPathTypedList<RouteNamedMap>[Name]

  /**
   * Generate a type safe params for a route location. Requires the name of the route to be passed as a generic.
   */
  export type RouteParams<Name extends keyof RouteNamedMap> = RouteNamedMap[Name]['params']
  /**
   * Generate a type safe raw params for a route location. Requires the name of the route to be passed as a generic.
   */
  export type RouteParamsRaw<Name extends keyof RouteNamedMap> = RouteNamedMap[Name]['paramsRaw']

  export function useRouter(): RouterTyped
  export function useRoute<Name extends keyof RouteNamedMap = keyof RouteNamedMap>(name?: Name): RouteLocationNormalizedLoadedTypedList<RouteNamedMap>[Name]

  export const useLink: UseLinkFnTyped<RouteNamedMap>

  export function onBeforeRouteLeave(guard: NavigationGuard<RouteNamedMap>): void
  export function onBeforeRouteUpdate(guard: NavigationGuard<RouteNamedMap>): void

  export const RouterLink: RouterLinkTyped<RouteNamedMap>
  export const RouterLinkProps: RouterLinkPropsTyped<RouteNamedMap>

  // Experimental Data Fetching

  export function defineLoader<
    P extends Promise<any>,
    Name extends keyof RouteNamedMap = keyof RouteNamedMap,
    isLazy extends boolean = false,
  >(
    name: Name,
    loader: (route: RouteLocationNormalizedLoaded<Name>) => P,
    options?: _DefineLoaderOptions<isLazy>,
  ): _DataLoader<Awaited<P>, isLazy>
  export function defineLoader<
    P extends Promise<any>,
    isLazy extends boolean = false,
  >(
    loader: (route: RouteLocationNormalizedLoaded) => P,
    options?: _DefineLoaderOptions<isLazy>,
  ): _DataLoader<Awaited<P>, isLazy>

  export {
    _definePage as definePage,
    _HasDataLoaderMeta as HasDataLoaderMeta,
    _setupDataFetchingGuard as setupDataFetchingGuard,
    _stopDataFetchingScope as stopDataFetchingScope,
  } from 'unplugin-vue-router/runtime'
}

declare module 'vue-router' {
  import type { RouteNamedMap } from 'vue-router/auto/routes'

  export interface TypesConfig {
    beforeRouteUpdate: NavigationGuard<RouteNamedMap>
    beforeRouteLeave: NavigationGuard<RouteNamedMap>

    $route: RouteLocationNormalizedLoadedTypedList<RouteNamedMap>[keyof RouteNamedMap]
    $router: _RouterTyped<RouteNamedMap>

    RouterLink: RouterLinkTyped<RouteNamedMap>
  }
}
