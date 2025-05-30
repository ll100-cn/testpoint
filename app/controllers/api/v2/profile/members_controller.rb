class Api::V2::Profile::MembersController < Api::BaseController
  before_action -> { authorize! :manage, :profile }
  before_action -> { @user = current_user }

  def index
    @members_scope = @user.members
    @members = @members_scope.available.joins(:project).merge(Project.available.ranked)
  end
end