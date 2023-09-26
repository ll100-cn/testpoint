class Api::Projects::ProfilesController < Api::Projects::BaseController
  before_action -> { @project = current_project }
  before_action -> { @member = current_member }
  before_action -> { authorize! :profile, @member }

  def show
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