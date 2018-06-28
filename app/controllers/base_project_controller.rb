class BaseProjectController < ApplicationController
  def current_project
    @current_project ||= Project.find(params[:project_id])
  end

  def current_member
    @current_member ||= current_project&.members&.where(user_id: current_user)&.take
  end

  def current_ability
    super.tap { |a| a.apply_member_permissions(current_member) }
  end
end
