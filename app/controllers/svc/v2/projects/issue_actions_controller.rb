class Svc::V2::Projects::IssueActionsController < Svc::V2::Projects::BaseController
  before_action -> { @project = current_project }
  load_and_authorize_resource :issue, through: :project

  def create
    authorize! :update, @issue

    with_email_notification do
      @activities = @issue.update_with_author(issue_params, current_member)
      IssueNotifyJob.perform_later(@issue.id)
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
