class TasksController < ApplicationController
  load_and_authorize_resource :plan
  load_and_authorize_resource throght: :plan

  def update
    @task.update(task_params)
    respond_with @task
  end

protected

  def task_params
    params.fetch(:task, {}).permit(:state)
  end
end
