class MainController < ApplicationController
  before_action :authenticate_user!

  def root
    redirect_to projects_path
  end
end