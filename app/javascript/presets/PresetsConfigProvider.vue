<template>
  <slot />
</template>

<script setup lang="ts">
import { provideAlertDialogPresenters } from '$ui/alert-dialog'
import * as AlertDialogPresenters from './AlertDialogPresenters'
provideAlertDialogPresenters(AlertDialogPresenters)

import * as AlertPresenters from './AlertPresenters'
import { provideAlertPresenters } from '$ui/alert'
provideAlertPresenters(AlertPresenters)

import * as BadgePresenters from './BadgePresenters'
import { provideBadgePresenters } from '$ui/badge'
provideBadgePresenters(BadgePresenters)

import * as ButtonPresenters from './ButtonPresenters'
import { provideButtonPresenters } from '$ui/button'
provideButtonPresenters(ButtonPresenters)

import * as CalloutPresenters from './CalloutPresenters'
import { provideCalloutPresenters } from '$ui/callout'
provideCalloutPresenters(CalloutPresenters)

import * as CardPresenters from './CardPresenters'
import { provideCardPresenters } from '$ui/card'
provideCardPresenters(CardPresenters)

import * as CheckboxPresenters from './CheckboxPresenters'
import { provideCheckboxPresenters } from '$ui/checkbox'
provideCheckboxPresenters(CheckboxPresenters)

import * as CollapsiblePresenters from './CollapsiblePresenters'
import { provideCollapsiblePresenters } from '$ui/collapsible'
provideCollapsiblePresenters(CollapsiblePresenters)

import * as DialogPresenters from './DialogPresenters'
import { provideDialogPresenters } from '$ui/dialog'
provideDialogPresenters(DialogPresenters)

import * as DropdownMenuPresenters from './DropdownMenuPresenters'
import { provideDropdownMenuPresenters } from '$ui/dropdown-menu'
provideDropdownMenuPresenters(DropdownMenuPresenters)

import * as FormPresenters from './FormPresenters'
import { provideFormPresenters } from '$ui/simple_form'
provideFormPresenters(FormPresenters)

import * as NavPresenters from './NavPresenters'
import { provideNavPresenters } from '$ui/nav'
provideNavPresenters(NavPresenters)

import * as ProgressPresenters from './ProgressPresenters'
import { provideProgressPresenters } from '$ui/progress'
provideProgressPresenters(ProgressPresenters)

import * as SelectPresenters from './SelectPresenters'
import { provideSelectPresenters } from '$ui/select'
provideSelectPresenters(SelectPresenters)

import * as SeparatorPresenters from './SeparatorPresenters'
import { provideSeparatorPresenters } from '$ui/separator'
provideSeparatorPresenters(SeparatorPresenters)

import * as TablePresenters from './TablePresenters'
import { provideTablePresenters } from '$ui/table'
provideTablePresenters(TablePresenters)

import * as TabsPresenters from './TabsPresenters'
import { provideTabsPresenters } from '$ui/tabs'
provideTabsPresenters(TabsPresenters)

import * as TooltipPresenters from './TooltipPresenters'
import { provideTooltipPresenters } from '$ui/tooltip'
provideTooltipPresenters(TooltipPresenters)

</script>
