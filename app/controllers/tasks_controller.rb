class TasksController < ApplicationController
  load_and_authorize_resource :plan
  load_and_authorize_resource throght: :plan

  def update
    @task.update(task_params)
    respond_with @task, location: ok_url_or_default([@task.plan])
  end

protected

  def task_params
    params.fetch(:task, {}).permit(:state, task_attachments_attributes: [:attachment_id, :content])
  end
end
