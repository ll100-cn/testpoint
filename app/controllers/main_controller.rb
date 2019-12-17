class MainController < ApplicationController
  before_action :authenticate_user!

  def root
    if (project = current_user.projects.find_by(id: cookies[:last_login_project]))
      redirect_to project
    else
      redirect_to projects_path
    end
  end
end
