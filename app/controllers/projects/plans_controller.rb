class Projects::PlansController < BaseProjectController
  load_and_authorize_resource :project
  load_and_authorize_resource :platform, through: :project
  load_and_authorize_resource through: :project

  def index
    @plans = @plans.available.page(params[:page]).ranked.page(params[:page]).per(12)
    @plan_phases = @plans.map(&:latest_phase)
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
    if params[:phase_index].nil?
      redirect_to url_for(action: :show, phase_index: @plan.phases.ranked.last.index)
      return
    end

    @current_phase = @plan.phases.where(index: params[:phase_index] || @plan.phases.ranked.last.index).take!
    @prev_phase = @current_phase.prev_phase

    @all_task_upshots_scope = @current_phase.task_upshots
    @q = @all_task_upshots_scope.ransack(params[:q])
    @all_task_upshots_scope = @q.result

    @all_task_upshots_scope = @all_task_upshots_scope.joins(task: :test_case)

    task_upshots_scope = @all_task_upshots_scope
    # task_upshots_scope = task_upshots_scope.where(test_cases: { folder_id: @folder.subtree }) if @folder
    task_upshots_scope = task_upshots_scope.merge(Task.ranked)

    @task_upshots = task_upshots_scope

    @folders = @project.folders.all
    @folder_tasks_counts = Folder.descendants_with_self_counts(@folders, {})
    # @folders = @folders.find_all { |folder| @folder_tasks_counts[folder.id] > 0 }
  end

  def destroy
    @plan.archive
    respond_with @plan, location: ok_url_or_default([@project, Plan])
  end

protected
  def plan_params
    params.fetch(:plan, {}).permit(:title, :milestone_id, :platform_id)
  end

  def filter_params
    params.fetch(:test_case_filter, {}).permit(label_ids: [], folder_ids: [])
  end
end
