class Api::V2::Projects::IssueBodiesController < Api::V2::Projects::BaseController
  before_action -> { @project = current_project }
  load_resource :issue, through: :project

  def update
    authorize! :update, 'IssueBody'

    with_email_notification do
      @issue.update_with_author(body_params, current_member)
    end

    respond_with @issue
  end

  def convert_comment
    authorize! :update, 'IssueBody'

    @issue.convert_comment
  end

protected

  def body_params
    params.permit(:content, attachments_params: [ :id, :title ])
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
