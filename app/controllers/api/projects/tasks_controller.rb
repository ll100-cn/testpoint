class Api::Projects::TasksController < Api::BaseController
  load_and_authorize_resource :project
  load_and_authorize_resource :plan, through: :project
  load_and_authorize_resource :task, through: :plan

  def show
  end

  def ignore
    @task.ignore
    respond_with @task
  end

  def unignore
    @task.unignore
    respond_with @task
  end
end
