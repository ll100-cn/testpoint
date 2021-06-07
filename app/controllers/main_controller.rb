class MainController < ApplicationController
  before_action :authenticate_user!

  def root
    @recent_issues = Issue.where(project: current_user.projects).where(updated_at: 1.week.ago..Time.current).order(:updated_at)
    @projects = current_user.projects.order(:created_at)
  end
end
