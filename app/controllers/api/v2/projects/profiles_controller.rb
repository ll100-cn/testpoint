class Api::V2::Projects::ProfilesController < Api::V2::Projects::BaseController
  before_action -> { @project = current_project }
  before_action -> { @member = current_member }
  before_action -> { authorize! :profile, @member }

  def show
    if @member.nil? && current_user.superadmin?
      @member = Member.new(user_id: current_user.id, project_id: @project.id, role: "owner")
    end
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