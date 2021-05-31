class Projects::PlansController < BaseProjectController
  load_and_authorize_resource :project
  load_and_authorize_resource :folder, through: :project
  load_and_authorize_resource :platform, through: :project
  load_and_authorize_resource through: :project

  def index
    @plans = @plans.available.page(params[:page]).ranked.page(params[:page]).per(12)
    @tasks_count_mapping = Task.where(plan_id: @plans).group(:plan_id, :state).count
  end

  def new
    @plan.title = "Test Plan: #{Date.current}"
  end

  def create
    @plan.creator = current_member
    @test_case_filter = TestCaseFilter.new(filter_params)
    @plan.submit(@test_case_filter)
    respond_with @plan, location: ok_url_or_default([@project, Plan])
  end

  def edit
  end

  def update
    @plan.update(plan_params)
    respond_with @plan, location: ok_url_or_default([@project, @plan])
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
    params.fetch(:plan, {}).permit(:title, :start_at, :milestone_id)
  end

  def filter_params
    params.fetch(:test_case_filter, {}).permit(label_ids: [], platform_ids: [], folder_ids: [])
  end
end
