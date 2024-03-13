class Api::Projects::IssueInfosController < Api::Projects::BaseController
  before_action { @user = current_user }
  before_action -> { @project = current_project }
  load_and_authorize_resource :issue, parent: false,
    with_scope: ->(base) {
      params[:action] == "show" ? base.in_project(@project) : base.where(project_id: @project.id)
    },
    authorization_action: ->(action) { { process2: :process }[action] }

  def show
  end

  def resolve
    if @issue.resolve(resolve_params, current_member)
      IssueNotifyJob.perform_later(@issue.id)
    end
    respond_with @issue
  end

  def process2
    if @issue.process(process_params, current_member)
      IssueNotifyJob.perform_later(@issue.id)
    end
    respond_with @issue
  end

protected
  def resolve_params
    ActionController::Parameters.new(request.request_parameters).permit(:action, comment_attributes: [
      :content, attachments_params: [ :id, :title ]
    ])
  end

  def process_params
    params.permit(:state)
  end
end
