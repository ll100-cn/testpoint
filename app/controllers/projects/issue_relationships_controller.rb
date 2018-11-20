class Projects::IssueRelationshipsController < BaseProjectController
  before_action -> { @project = current_project }
  load_and_authorize_resource :issue, through: :project
  load_and_authorize_resource through: :issue, through_association: :source_relationships, parent: false

  def new
  end

  def create
    if @issue_relationship.submit(current_member)
      @issue_relationship.source.deliver_changed_notification(current_member)
      @issue_relationship.target.deliver_changed_notification(current_member)
    end
    respond_with @issue_relationship, location: ok_url_or_default([@project, @issue])
  end

  def destroy
    if @issue_relationship.destroy
      @issue_relationship.source.deliver_changed_notification(current_member)
      @issue_relationship.target.deliver_changed_notification(current_member)
    end
    respond_with @issue_relationship, location: ok_url_or_default([@project, @issue])
  end

protected
  def issue_relationship_params
    params.fetch(:issue_relationship, {}).permit(:target_id, :category)
  end
end
