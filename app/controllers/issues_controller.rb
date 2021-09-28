class IssuesController < ApplicationController
  before_action -> { @user = User.find(current_user.id) }
  before_action -> { @issues = Issue.where(project: @user.projects) }

  def my
    @issues = @issues.where(assignee: @user.members)
          .or(@issues.where(creator: @user.members))
          .or(@issues.where_exists(@user.subscriptions.where_table(:issue)))
  
    @q = @issues.ransack(params[:q])
    @q.state_filter ||= "opening"

    @issues_scope = @q.result

    @issues_state_counts = @issues_scope.unscope(:order, where: :state).group(:state).count
    @issues = @issues_scope.page(params[:page])
  end

  def new
    @issue = Issue.new
  end

  def create
    @project = @user.projects.find(issue_params[:project_id])
    redirect_to [:new, @project, :issue]
  end

  def issue_params
    params.fetch(:issue, {}).permit(:project_id)
  end
end
