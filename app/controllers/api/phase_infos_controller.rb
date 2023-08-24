class Api::PhaseInfosController < Api::BaseController
  load_and_authorize_resource :project
  load_and_authorize_resource :plan, through: :project

  def index
    @phases_scope = @plan.phases
    @phases = @phases_scope.ranked
    @upshots_state_counts_mapping = {}
    TaskUpshot.joins(:phase).merge(@phases_scope).group(:phase_id, :state).count.each do |(phase_id, state), count|
      @upshots_state_counts_mapping[phase_id] ||= {}
      @upshots_state_counts_mapping[phase_id][state] = count
    end
  end
end
