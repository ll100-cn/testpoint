class TasksController < ApplicationController
  load_and_authorize_resource :plan
  load_and_authorize_resource throght: :plan

  def edit
  end

  def update
    @task.update(task_params)
    respond_with @task, location: ok_url_or_default([@task.plan])
  end

  def change_state
  end

  def upload_attachment
  end

  def relate
  end

protected

  def task_params
    params.fetch(:task, {}).permit(:state, :issue_id, task_attachments_attributes: [:id, :attachment_id, :content, :_destroy])
  end
end
