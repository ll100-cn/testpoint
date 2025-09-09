class Svc::Projects::BaseController < Svc::BaseController

protected
  def current_project
    @project ||= Project.find(params[:project_id])
  end

  def current_member
    return @current_member if defined?(@current_member)
    @current_member = current_project.members.where(user_id: current_user).take
  end

  def current_ability
    super.tap { |a| a.apply_member_permissions(current_member) }
  end
end
