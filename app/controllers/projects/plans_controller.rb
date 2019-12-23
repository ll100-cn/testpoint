class Projects::PlansController < BaseProjectController
  layout 'card-full-height', only: [:index]
  before_action { @navbar = "plans" }
  before_action -> { @project = current_project }
  authorize_resource :project
  load_and_authorize_resource :folder, through: :project
  load_and_authorize_resource :platform, through: :project
  load_and_authorize_resource through: :project

  def index
    @plans = @plans.available.page(params[:page]).ranked
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
    tasks_scope = @plan.tasks.joins(:test_case)
    tasks_scope = tasks_scope.where(platform: @platform) if @platform
    tasks_scope = tasks_scope.joins(:test_case).where(test_cases: { folder_id: @folder.subtree }) if @folder

    @q = tasks_scope.ransack(params[:q])
    tasks_scope = @q.result
    @tasks = tasks_scope

    @folders = @project.folders.ranked
    @folder_tasks_counts = Folder.descendants_with_self_counts(@folders, tasks_scope.group("test_cases.folder_id").count)
    @folders = @folders.find_all { |folder| @folder_tasks_counts[folder.id] > 0 }
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
