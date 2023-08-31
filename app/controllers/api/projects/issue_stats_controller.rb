class Api::Projects::IssueStatsController < Api::BaseController
  load_and_authorize_resource :project
  load_and_authorize_resource :issue, through: :project, parent: false

  def index
    issues_scope = @issues
    @issue_filter_state_counts = issues_scope.group(:state, "assignee_id IS NOT NULL", "issues.archived_at IS NOT NULL").count.transform_keys do |it|
      [ :state, :assignee_id_is, :archived_at_is ].zip(it).to_h
    end
    @issue_filter_state_counts = @issue_filter_state_counts.map do |key, value|
      { state: key[:state], assignee_id_is: key[:assignee_id_is], archived_at_is: key[:archived_at_is], count: value }
    end
  end
end
