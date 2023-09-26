class Api::Projects::IssueActionsController < Api::Projects::BaseController
  before_action -> { @project = current_project }
  load_and_authorize_resource :issue

  def create
    authorize! :update, @issue

    with_email_notification do
      @activities = @issue.update_with_author(issue_params, current_member)
    end

    respond_with @issue
  end

protected
  def issue_params_names
    names = [
      :priority, :title, :content, :state, :milestone_id, :assignee_id,
      :template_id, :project_id, :category_id, :task_id, :targert_project_id,
      attachment_ids: [],
      subscribed_user_ids: [],
      template_ids: []
    ]
    names += [ :creator_id ] if can? :manage, Issue
    names
  end

  def issue_params
    params.permit(*issue_params_names)
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
