class Projects::TasksController < BaseProjectController
  load_and_authorize_resource :project
  load_and_authorize_resource :plan
  load_and_authorize_resource through: :plan
  load_and_authorize_resource through: :project

  def row
  end

  def edit
    @task.assign_attributes(task_params)
  end

  def update
    @task.update(task_params)
    @related_issues = @project.issues.left_outer_joins(:tasks).where(tasks: { test_case_id: @task.test_case.id }).records
    respond_with @task, location: -> { ok_url_or_default [ @project, @plan ] }
  end

  def show
    @related_issues = @project.issues.left_outer_joins(:tasks).where(tasks: { test_case_id: @task.test_case.id }).records
  end

  def upload_attachment
  end

  def related_issues
  end

protected
  def task_params
    params.fetch(:task, {}).permit(:state, :test_case_version, :issue_id, :message, attachment_ids: [])
  end
end
