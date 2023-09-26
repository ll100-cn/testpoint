class Api::Profile::IssueStatsController < Api::BaseController
  before_action -> { authorize! :manage, :profile }
  before_action -> { @user = current_user }

  def index
    @issues_scope = Issue.where(project_id: @user.available_projects)
    @project_issues_mapping = @issues_scope.group(:project_id, :stage, :category_id).select(:project_id, :stage, :category_id, "COUNT(*) as count")
  end
end