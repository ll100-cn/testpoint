class Projects::PlansController < BaseProjectController
  layout 'card-full-height', only: [:index, :show]
  before_action { @navbar = "plans" }
  before_action -> { @project = current_project }
  authorize_resource :project
  load_and_authorize_resource :folder
  load_and_authorize_resource :platform
  load_and_authorize_resource through: :project

  def index
    @plans = @plans.available.page(params[:page])
    @tasks_count_mapping = Task.group(:plan_id, :state).count
  end

  def new
    @plan.title = "Test Plan: #{Date.current}"
  end

  def create
    test_cases_scope = @project.test_cases.joins(:folder).where(folders: { id: params[:folder_ids] }) if params[:folder_ids].present?

    @plan.generate(test_case_ids: test_cases_scope&.ids || TestCase.ids, platform_ids: params[:platform_ids] || Platform.ids)
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
    @tasks = @tasks.where(platform: @platform) if @platform
    @tasks = @tasks.joins(:test_case).where(test_cases: { folder: @folder.subtree }) if @folder
    @tasks = @tasks.ransack(params[:q]).result

    @folders = @project.folders.available.ranked
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
