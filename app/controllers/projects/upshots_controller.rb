class Projects::UpshotsController < BaseProjectController
  load_and_authorize_resource :project
  load_and_authorize_resource :plan
  load_and_authorize_resource :task, through: :plan

  before_action :prepare_upshot

  def show
  end

  def row
    @last_upshot = @task.upshots.where("phase_id <= ?", @upshot.phase_id).order(phase_id: :desc).first
  end

  def state
    if @upshot.submit(state_params, current_member)
      @upshot_was = @upshot
    else
      @action_error_state = @upshot.state
    end

    respond_with @upshot, action: :show
  end

  def content
    @upshot.assign_attributes(content_params)

    if @upshot.save
      @upshot_was = @upshot
    else
      @content_error_state = @upshot.state
    end
    
    respond_with @upshot, action: :show
  end

protected
  def content_params
    params.fetch(:task_upshot, {}).permit(:content)
  end

  def state_params
    params.fetch(:task_upshot, {}).permit(:state,
      issue_attributes: [:title, :content, :assignee_id, :state]
    )
  end

  def prepare_upshot
    @upshot = @task.upshots.fetch_by_token(params[:id])
    @upshot_was = @upshot.dup
  end
end
