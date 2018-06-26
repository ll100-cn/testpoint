class BaseProjectController < ApplicationController
  def current_project
    @current_project ||= Project.find(params[:project_id])
  end
end
