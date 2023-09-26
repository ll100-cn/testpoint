class Api::Projects::UpshotsController < Api::Projects::BaseController
  load_and_authorize_resource :project
  load_and_authorize_resource :plan
  load_and_authorize_resource :task, through: :plan

  before_action :prepare_upshot

  def state
    if @upshot.submit(state_params, current_member)
      @upshot_was = @upshot
    else
      @action_error_state = @upshot.state
    end

    respond_with @upshot
  end

  def content
    @upshot.assign_attributes(content_params)

    if @upshot.save
      @upshot_was = @upshot
    else
      @content_error_state = @upshot.state
    end

    respond_with @upshot
  end

protected
  def state_params
    params.fetch(:task_upshot, {}).permit(:state_override, issue_attributes: [:title, :content, :assignee_id, :state])
  end

  def content_params
    params.permit(:content)
  end

  def prepare_upshot
    @phases = @plan.phases.ranked
    @upshot = TaskUpshot.where(task_id: @task.id).find(params[:id])
    @upshot_was = @upshot.dup
  end
end
