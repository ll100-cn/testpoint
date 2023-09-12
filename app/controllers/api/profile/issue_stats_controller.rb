class Api::Profile::IssueStatsController < Api::BaseController
  before_action -> { @user = current_user }
  load_and_authorize_resource :project, parent: false
  load_and_authorize_resource :issue, parent: false, with_scope: ->(base) { base.where(project_id: @projects.ids) }

  def index
    @project_issues_mapping = @issues.group(:project_id, :stage, :category_id).select(:project_id, :stage, :category_id, "COUNT(*) as count")
  end
end