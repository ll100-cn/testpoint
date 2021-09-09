class Projects::TasksController < BaseProjectController
  load_and_authorize_resource :project
  load_and_authorize_resource :plan
  load_and_authorize_resource through: :plan

  def row
    @phase = @plan.phases.where(id: params[:phase_id]).take!
  end

  def edit
    @task.assign_attributes(task_params)
    if @task.state.failure? && @task.issues.empty?
      issue = @task.issues.build 
      issue.assignee = @task.platform.default_assignee
      issue.title = "【测试失败】" + @task.test_case.title
      issue.state = :confirmed
      issue.content =
"""
预期效果:
#{(@task.content || @task.test_case.content).to_s}\n
实际效果:
"""
    end
  end

  def update
    @task.assign_attributes(task_params)
    @task.issues.each do |issue|
      issue.project ||= @project
      issue.creator ||= current_member
    end
    @task.save
    respond_with @task, location: -> { ok_url_or_default [ @project, @plan ] }
  end


  def show
    @phase = @plan.phases.where(id: params[:phase_id]).take!
    @upshot = @task.upshots.where(phase_id: @phase).first_or_initialize

  end

  def upload_attachment
  end

  def related_issues
  end

protected
  def task_params
    params.fetch(:task, {}).permit(
      :state, :test_case_version, :issue_id, :message, :content,
      attachment_ids: [],
      issues_attributes: [:id, :title, :content, :assignee_id, :state],
    )
  end
end
