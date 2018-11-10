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
    @related_issues = @project.issues.left_outer_joins(:tasks).where(tasks: { test_case_id: @task.test_case.id }).records
  end

  def upload_attachment
  end

  def related_issues
  end

protected
  def task_params
    params.fetch(:task, {}).permit(:state, :issue_id, :message, attachment_ids: [])
  end
end
