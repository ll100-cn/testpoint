class Api::TaskUpshotInfosController < Api::BaseController
  load_and_authorize_resource :project
  load_and_authorize_resource :plan, through: :project

  def index
    @current_phase = @plan.phases.where(index: params[:phase_id] || @plan.phases.ranked.last.index).take!
    @all_task_upshots_scope = @current_phase.task_upshots

    @task_upshots = @all_task_upshots_scope.includes(task: :test_case).references(task: :test_case).order(:task_id)

    test_case_scope = TestCase.where_exists(@plan.tasks.where_table(:test_case))
    @test_cases = TestCase.filter_by_version_at(test_case_scope, @plan.created_at)
    @test_case_mapping = @test_cases.index_by(&:id)

    @task_stats_by_phase_mapping = TaskUpshot.where(phase_id: @plan.phases).group_by(&:task_id)
  end

  def show
    @current_phase = @plan.phases.where(index: params[:phase_id] || @plan.phases.ranked.last.index).take!
    @all_task_upshots_scope = @current_phase.task_upshots

    @task_upshot = @all_task_upshots_scope.find(params[:id])

    test_case_scope = TestCase.where_exists(@plan.tasks.where(id: @task_upshot.task_id).where_table(:test_case))
    @test_cases = TestCase.filter_by_version_at(test_case_scope, @plan.created_at)
    @test_case_mapping = @test_cases.index_by(&:id)

    @task_stats_by_phase_mapping = TaskUpshot.where(phase_id: @plan.phases).group_by(&:task_id)
  end
end
