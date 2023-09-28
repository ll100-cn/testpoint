class Api::Projects::TasksController < Api::Projects::BaseController
  before_action -> { @project = current_project }
  load_and_authorize_resource :plan, through: :project
  load_and_authorize_resource :task, through: :plan, authorization_action: ->(action) {
    { ignore: :update, unignore: :update }[action]
  }

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
