class Api::Projects::IssueActionsController < Api::Projects::BaseController
  before_action -> { @project = current_project }
  load_and_authorize_resource :issue, through: :project

  def create
    authorize! :update, @issue

    with_email_notification do
      @activities = @issue.update_with_author(issue_params, current_member)
      if @issue.saved_change_to_state? && @issue.state.confirmed?
        SyncTrelloJob.perform_async(@issue.id)
      end
    end

    respond_with @issue
  end

protected
  def issue_params
    params.permit(:title, :state, :priority, :creator_id, :assignee_id, :milestone_id, :category_id)
  end

  def with_email_notification
    yield
    if (changes = @issue.previous_changes).any?
      @issue.notify_creator if changes.fetch("state", []).last == "resolved"
      current_user.subscribe(@issue)
      @issue.notify_changed_by(current_member, changes)
    end
  end
end
