class Api::PlansController < Api::BaseController
  load_and_authorize_resource :project
  load_and_authorize_resource :platform, through: :project
  load_and_authorize_resource through: :project

  def index
    @plans_scope = @plans.available
    @plans_scope = @plans_scope.includes(:platform).references(:platform)
    @plans_scope = @plans_scope.includes(:creator).references(:creator)
    @plans = @plans_scope.ranked.page(params[:page]).per(12)

    kaminari_headers(@plans)

    @tasks_counts_records = Task.where(plan_id: @plans).group(:plan_id, :state).count
    @tasks_state_counts_mapping = @tasks_counts_records.each_with_object({}) do |((plan_id, state), count), hash|
      hash[plan_id] ||= {}
      hash[plan_id][state] = count
    end
  end
end
