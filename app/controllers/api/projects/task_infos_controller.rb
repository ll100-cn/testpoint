class Api::Projects::TaskInfosController < Api::Projects::BaseController
  before_action -> { @project = current_project }
  load_and_authorize_resource :plan, through: :project

  def show
    @task = @plan.tasks.find(params[:id])
    @task_upshots = @task.upshots
    @issues = @task.issues
  end
end
