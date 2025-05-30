class Api::V2::Projects::TasksController < Api::V2::Projects::BaseController
  allow_graph :info

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
