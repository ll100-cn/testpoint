class Api::Projects::PlanInfosController < Api::Projects::BaseController
  before_action -> { @project = current_project }
  load_and_authorize_resource :platform, through: :project
  load_and_authorize_resource :plan, parent: false, through: :project

  def show
    @phases_scope = @plan.phases
    @upshots_state_counts_mapping = {}
    @plan.upshots.joins(:phase).merge(@phases_scope).group(:phase_id, :state).count.each do |(phase_id, state), count|
      @upshots_state_counts_mapping[phase_id] ||= {}
      @upshots_state_counts_mapping[phase_id][state] = count
    end

    @tasks_counts_records = @plan.tasks.group(:plan_id, :state).count
    @tasks_state_counts_mapping = @tasks_counts_records.each_with_object({}) do |((plan_id, state), count), hash|
      hash[plan_id] ||= {}
      hash[plan_id][state] = count
    end
  end
end
