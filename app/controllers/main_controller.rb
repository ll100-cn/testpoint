class MainController < ApplicationController
  before_action :authenticate_user!

  def root
    if (project = current_user.default_project)
      redirect_to project
    else
      redirect_to projects_path
    end
  end
end
