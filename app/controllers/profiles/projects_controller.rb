class Profiles::ProjectsController < ApplicationController
  before_action -> { @user = User.find(current_user.id) }
  before_action -> { authorize! :manage, :profile }
  load_resource :member, through: :user, find_by: :project_id, id_param: :id
  before_action -> { @project = @member.project }

  def show
  end

  def update
    @member.update(member_params)
    respond_with @member, action: :show, location: ok_url_or_default(action: :show)
  end

protected
  def member_params
    params.fetch(:member, {}).permit(:nickname)
  end
end
