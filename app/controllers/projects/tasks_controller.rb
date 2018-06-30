class Projects::TasksController < BaseProjectController
  before_action -> { @project = current_project }
  authorize_resource :project
  load_and_authorize_resource :plan
  load_and_authorize_resource through: :plan
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

  def related_issues
    @q = @project.issues.not_closed.ransack(params[:q])
    @issues = @q.result.with_labels.page(params[:page])
  end

protected
  def task_params
    params.fetch(:task, {}).permit(:state, :issue_id, :message, task_attachments_attributes: [:id, :attachment_id, :_destroy])
  end
end
