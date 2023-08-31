class Api::Projects::PlansController < Api::BaseController
  load_and_authorize_resource :project
  load_and_authorize_resource :platform, through: :project
  load_and_authorize_resource through: :project

  def index
    @plans_scope = @plans.available.ranked
    @plans_scope = @plans_scope.includes(:platform).references(:platform)
    @plans_scope = @plans_scope.includes(:creator).references(:creator)
    @q = @plans_scope.ransack(params[:q])
    @plans = @q.result.page(params[:page]).per(12)
    kaminari_headers(@plans)

    @tasks_counts_records = Task.where(plan_id: @plans).group(:plan_id, :state).count
    @tasks_state_counts_mapping = @tasks_counts_records.each_with_object({}) do |((plan_id, state), count), hash|
      hash[plan_id] ||= {}
      hash[plan_id][state] = count
    end
  end

  def create
    @plan.creator = current_member
    @test_case_filter = TestCaseFilter.new(filter_params)
    @plan.submit(@test_case_filter)
    respond_with @plan
  end

  def show
  end

  def destroy
    @plan.archive
    respond_with @plan
  end

  def update
    @plan.update(plan_params)
    respond_with @plan
  end

protected
  def plan_params
    params.permit(:title, :milestone_id, :platform_id)
  end

  def filter_params
    params.permit(role_names: [])
  end
end
