class MainController < ApplicationController
  before_action :authenticate_user!

  def root
    redirect_to dashboard_issues_path
  end
end
