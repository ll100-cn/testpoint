require 'rails_helper'

RSpec.describe Api::Projects::IssueRelationshipsController, type: :controller do
  let!(:project) { create :project }
  let!(:issue) { create :issue, state: "pending", project: project }
  let!(:issue2) { create :issue, project: project }
  let!(:user) { create :user, :superadmin }
  let!(:member) { create :member, :developer, user: user, project: project }
  before { sign_in user }

  describe "POST create" do
    action { post :create, params: { project_id: project.id, issue_id: issue.id, target_id: issue2.id }, format: :json }
    it { is_expected.to respond_with :success }
  end

  describe "DELETE destroy" do
    let!(:issue_relationship) { create :issue_relationship, source: issue, target: issue2, member: member }

    action(skip: true) { delete :destroy, params: { project_id: project.id, issue_id: issue.id, id: issue_relationship.id }, format: :json }

    it { expect { do_action }.to change { IssueRelationship.count }.by(-1) }
  end
end
