class Projects::PlansController < BaseProjectController
  layout "sidebar", only: [:show]
  before_action { @navbar = "plans" }
  before_action -> { @project = current_project }
  authorize_resource :project
  load_and_authorize_resource through: :project

  def index
    @plans = @plans.available.page(params[:page])
    @tasks_count_mapping = Task.group(:plan_id, :state).count
  end

  def new
    @plan.title = "Test Plan: #{Date.current}"
  end

  def create
    test_cases_scope = TestCase
    test_cases_scope = test_cases_scope.joins(:component).where(components: { id: params[:component_ids] }) if params[:component_ids].present?
    test_cases_scope = test_cases_scope.joins(:platforms).where(platforms: { id: params[:platform_ids] }) if params[:platform_ids].present?
    test_case_ids = test_cases_scope.ids

    @plan.generate(test_case_ids: test_case_ids || TestCase.ids)
    respond_with @plan, location: ok_url_or_default([@project, Plan])
  end

  def edit
  end

  def update
    @plan.update(plan_params)
    respond_with @plan, location: ok_url_or_default([@project, Plan])
  end

  def show
    @tasks = @plan.tasks
    @q = @tasks.search(params[:q])
    @tasks = @q.result

    respond_with @plan, location: ok_url_or_default(action: :show)
  end

  def destroy
    @plan.archive
    respond_with @plan, location: ok_url_or_default([@project, Plan])
  end

protected
  def plan_params
    params.fetch(:plan, {}).permit(:title, :start_at)
  end
end
