class Api::Projects::TaskUpshotInfosController < Api::Projects::BaseController
  before_action -> { @project = current_project }
  load_and_authorize_resource :plan, through: :project

  def index
    @current_phase = @plan.phases.find(params[:phase_id])
    @all_task_upshots_scope = @current_phase.task_upshots

    @task_upshots = @all_task_upshots_scope.includes(task: :test_case).references(task: :test_case).order(:task_id)

    test_case_scope = TestCase.where_exists(@plan.tasks.where_table(:test_case))
    @test_cases = TestCase.filter_by_version_at(test_case_scope, @current_phase.created_at)
    @test_case_mapping = @test_cases.index_by(&:id)
  end
end
