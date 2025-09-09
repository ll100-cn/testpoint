class Svc::V2::Projects::IssueRelationshipsController < Svc::V2::Projects::BaseController
  load_and_authorize_resource :project
  load_and_authorize_resource :issue, through: :project
  load_and_authorize_resource through: :issue, through_association: :source_relationships, parent: false

  def create
    @issue_relationship.submit_and_save(current_member)
    respond_with @issue_relationship
  end

  def destroy
    @issue_relationship.destroy
    respond_with @issue_relationship
  end

protected
  def issue_relationship_params
    params.permit(:target_id, :creator_subscribe_target_issue)
  end
end
