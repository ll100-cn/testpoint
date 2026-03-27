<template>
  <slot />
</template>

<script setup lang="ts">
import { provideAlertDialogPresenters } from '$ui/alert-dialog'
import * as AlertDialogPresenters from './presenters/AlertDialogPresenters'
provideAlertDialogPresenters(AlertDialogPresenters)

import * as AlertPresenters from './presenters/AlertPresenters'
import { provideAlertPresenters } from '$ui/alert'
provideAlertPresenters(AlertPresenters)

import * as BadgePresenters from './presenters/BadgePresenters'
import { provideBadgePresenters } from '$ui/badge'
provideBadgePresenters(BadgePresenters)

import * as ButtonPresenters from './presenters/ButtonPresenters'
import { provideButtonPresenters } from '$ui/button'
provideButtonPresenters(ButtonPresenters)

import * as ButtonGroupPresenters from './presenters/ButtonGroupPresenters'
import { provideButtonGroupPresenters } from '$ui/button-group'
provideButtonGroupPresenters(ButtonGroupPresenters)

import * as CalloutPresenters from './presenters/CalloutPresenters'
import { provideCalloutPresenters } from '$ui/callout'
provideCalloutPresenters(CalloutPresenters)

import * as CardPresenters from './presenters/CardPresenters'
import { provideCardPresenters } from '$ui/card'
provideCardPresenters(CardPresenters)

import * as CollapsiblePresenters from './presenters/CollapsiblePresenters'
import { provideCollapsiblePresenters } from '$ui/collapsible'
provideCollapsiblePresenters(CollapsiblePresenters)

import * as ContainerPresenters from './presenters/ContainerPresenters'
import { provideContainerPresenters } from '$ui/container'
provideContainerPresenters(ContainerPresenters)

import * as DialogPresenters from './presenters/DialogPresenters'
import { provideDialogPresenters } from '$ui/dialog'
provideDialogPresenters(DialogPresenters)

import * as DropdownMenuPresenters from './presenters/DropdownMenuPresenters'
import { provideDropdownMenuPresenters } from '$ui/dropdown-menu'
provideDropdownMenuPresenters(DropdownMenuPresenters)

import * as FormPresenters from './presenters/FormPresenters'
import { provideFormPresenters } from '$ui/simple_form'
provideFormPresenters(FormPresenters)

import * as NavPresenters from './presenters/NavPresenters'
import { provideNavPresenters } from '$ui/nav'
provideNavPresenters(NavPresenters)

import * as ProgressPresenters from './presenters/ProgressPresenters'
import { provideProgressPresenters } from '$ui/progress'
provideProgressPresenters(ProgressPresenters)

import * as SeparatorPresenters from './presenters/SeparatorPresenters'
import { provideSeparatorPresenters } from '$ui/separator'
provideSeparatorPresenters(SeparatorPresenters)

import * as TablePresenters from './presenters/TablePresenters'
import { provideTablePresenters } from '$ui/table'
provideTablePresenters(TablePresenters)

import * as TabsPresenters from './presenters/TabsPresenters'
import { provideTabsPresenters } from '$ui/tabs'
provideTabsPresenters(TabsPresenters)

import * as TooltipPresenters from './presenters/TooltipPresenters'
import { provideTooltipPresenters } from '$ui/tooltip'
provideTooltipPresenters(TooltipPresenters)

import * as PaginationPresenters from './presenters/PaginationPresenters'
import { providePaginationPresenters } from '$ui/pagination'
providePaginationPresenters(PaginationPresenters)

import * as InputPresenters from './presenters/InputPresenters'
import { provideInputPresenters } from '$ui/input'
provideInputPresenters(InputPresenters)

import * as WellPresenters from './presenters/WellPresenters'
import { provideWellPresenters } from '$ui/well'
provideWellPresenters(WellPresenters)

</script>
