import { PhaseInfo } from "./PhaseInfo"
import { Plan } from "./Plan"
import * as t from '@/lib/transforms'

export class PlanInfo extends Plan {
  @t.Klass(PhaseInfo) phase_infos!: PhaseInfo[]
}
