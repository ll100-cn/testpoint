class Api::Projects::IssueStatsController < Api::Projects::BaseController
  before_action -> { @project = current_project }
  load_and_authorize_resource :issue, parent: false, through: :project

  def index
    @issues_scope = IssueSearcher.build_scope(@issues, params)
    @project_issues_mapping = @issues_scope.group(:project_id, :stage, :category_id).select(:project_id, :stage, :category_id, "COUNT(*) as count")
  end
end
