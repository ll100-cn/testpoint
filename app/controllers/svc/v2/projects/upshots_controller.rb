class Svc::V2::Projects::UpshotsController < Svc::V2::Projects::BaseController
  before_action { @project = current_project }
  load_and_authorize_resource :plan, through: :project
  load_and_authorize_resource :task, through: :plan

  before_action :prepare_upshot

  def state
    authorize! :update, @upshot

    @upshot.submit(state_params, current_member)
    respond_with @upshot
  end

  def content
    authorize! :update, @upshot

    @upshot.assign_attributes(content_params)
    @upshot.save

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
