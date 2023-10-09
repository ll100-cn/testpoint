class Api::Projects::MemberInfosController < Api::Projects::BaseController
  before_action -> { @project = current_project }
  load_and_authorize_resource :member, parent: false, through: :project, authorization_action: ->(action) { { list: :index }[action] }

  def index
    @q = @project.members.ransack(params[:q])
    @q.sorts = "user_email" if @q.sorts.empty?
    @members = @q.result
  end
end
