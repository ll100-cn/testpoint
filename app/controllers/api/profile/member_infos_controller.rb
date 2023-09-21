class Api::Profile::MemberInfosController < Api::BaseController
  before_action -> { @user = current_user }
  load_and_authorize_resource :member, parent: false, through: :user

  def index
    @members = @members.available.joins(:project).merge(Project.ranked)
  end

  def update
    @member.update(member_params)
    respond_with @member
  end

protected
  def member_params
    params.permit(:nickname)
  end
end