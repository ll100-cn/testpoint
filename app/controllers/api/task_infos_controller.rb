class Api::TaskInfosController < Api::BaseController
  load_and_authorize_resource :project
  load_and_authorize_resource :plan, through: :project

  def show
    @task = @plan.tasks.find(params[:id])
    @task_upshots = @task.upshots
    @issues = @task.issues
    sleep(2)
  end
end
