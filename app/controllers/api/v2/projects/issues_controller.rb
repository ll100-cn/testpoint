class Api::V2::Projects::IssuesController < Api::V2::Projects::BaseController
  before_action -> { @project = current_project }
  load_and_authorize_resource through: :project, authorization_action: ->(action) {
    { archive: :create, unresolve: :create, body: :update, merge: :manage }[action]
  }

  def index
    @stage = params[:stage] || "pending"
    @keyword = params[:keyword].presence

    all_issues_scope = @issues

    issues_scope = all_issues_scope
    issues_scope = issues_scope.where(stage: @stage) if @stage != "all"
    if @keyword
      keyword_scope = issues_scope
      words = @keyword.presence.split
      conditions = words.map do |word|
        keyword_scope.where_any_of(
          Issue.where_exists(Comment.where("content LIKE ?", "%#{word}%").where_table(:issue)),
          Issue.where("title LIKE ? or content LIKE ?", "%#{word}%", "%#{word}%")
        )
      end
      issues_scope = issues_scope.where_any_of(*conditions)
    end
    @issue_searcher = IssueSearcher.from(issues_scope, params)
    @issues_scope = @issue_searcher.result

    @filter_issues_scope = @issues_scope.unscope(:order)
    @q = @issues_scope.ransack(params[:q])
    @q.sorts = params[:sorts] if params[:sorts]
    @q.sorts = "updated_at desc" if @q.sorts.empty?
    @issues = @q.result.page(params[:page]).per(params[:limit] || 25)

    if resource_graph_columns.include?("counts")
      @project_issue_stats = all_issues_scope.group(:project_id, :stage, :category_id).select(:project_id, :stage, :category_id, "COUNT(*) as count")
    end
  end
end