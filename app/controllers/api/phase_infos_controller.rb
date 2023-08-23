class Api::PhaseInfosController < Api::BaseController
  load_and_authorize_resource :project
  load_and_authorize_resource :plan, through: :project

  def index
    @phase_infos = @plan.phases.ranked.includes(task_upshots: { task: :test_case })
    @upshots_state_counts = @phase_infos.each_with_object({}) do |phase_info, counts|
      counts[phase_info.id] = phase_info.task_upshots.group(:state).count
    end
  end
end
