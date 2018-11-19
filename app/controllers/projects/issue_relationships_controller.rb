class Projects::IssueRelationshipsController < BaseProjectController
  before_action -> { @project = current_project }
  load_and_authorize_resource :issue, through: :project
  load_and_authorize_resource through: :issue, through_association: :source_relationships, parent: false

  def new
  end

  def create
    @issue_relationship.submit(current_member)
    respond_with @issue_relationship, location: ok_url_or_default([@project, @issue])
  end

  def destroy
    @issue_relationship.destroy
    respond_with @issue_relationship, location: ok_url_or_default([@project, @issue])
  end

protected
  def issue_relationship_params
    params.fetch(:issue_relationship, {}).permit(:target_id, :category)
  end
end
