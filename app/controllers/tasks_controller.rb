class TasksController < ApplicationController
  load_and_authorize_resource :plan
  load_and_authorize_resource throght: :plan
  load_and_authorize_resource :project
  load_and_authorize_resource through: :project

  def edit
  end

  def update
    @task.update(task_params)
    respond_with @task, location: ok_url_or_default([@project, @task.plan])
  end

  def change_state
  end

  def upload_attachment
  end

  def relate
  end

protected

  def task_params
    params.fetch(:task, {}).permit(:state, :issue_id, :message, attachments_attributes: [:id, :file, :title, :_destroy])
  end
end
