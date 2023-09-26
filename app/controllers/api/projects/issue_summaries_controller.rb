class Api::Projects::IssueSummariesController < Api::Projects::BaseController
  before_action -> { @project = current_project }
  load_and_authorize_resource :issue, parent: false, through: :project

  def index
    @issues_scope = IssueSearcher.build_scope(@issues, search_params)

    @categories_counts = IssueSearcher.build_scope(@issues_scope, filter_params.except(:category_id_eq)).group(:category).count
    @milestone_counts = IssueSearcher.build_scope(@issues_scope, filter_params.except(:milestone_id_eq)).group(:milestone).count
    @assignee_counts = IssueSearcher.build_scope(@issues_scope, filter_params.except(:assignee_id_eq)).group(:assignee).count
    @creator_counts = IssueSearcher.build_scope(@issues_scope, filter_params.except(:creator_id_eq)).group(:creator).count
  end

protected
  def search_params
    params.permit(:keyword, :stage)
  end

  def filter_params
    params.permit(:category_id_eq, :milestone_id_eq, :assignee_id_eq, :creator_id_eq)
  end
end
