require 'rails_helper'

RSpec.describe Projects::IssueRelationshipsController, type: :controller do
  let!(:project) { create :project }
  let!(:issue) { create :issue, state: "pending", project: project }
  let!(:issue2) { create :issue, project: project }
  let!(:user) { create :user, :superadmin }
  let!(:member) { create :member, :developer, user: user, project: project }
  before { sign_in user }

  describe "get new" do
    action { get :new, params: { project_id: project.id, issue_id: issue.id, format: :xhrml } }

    it { is_expected.to respond_with :success }
  end

  describe "POST create" do
    context "when relation is duplicated" do
      let(:attributes) { { target_id: issue2.id, category: "duplicated" }}

      context "success" do
        action { post :create, params: { project_id: project.id, issue_id: issue.id, issue_relationship: attributes } }

        it { is_expected.to respond_with :redirect
          expect(issue.reload.state.closed?).to be_truthy }
      end

      context "failed" do
        before { allow_any_instance_of(Issue).to receive(:update_with_editor).with({"state" => "closed"}, member).and_return(false) }
        action(skip: true) { post :create, params: { project_id: project.id, issue_id: issue.id, issue_relationship: attributes } }

        it { expect{ do_action }.to raise_error }
      end

    end

    context "when relation is reference" do
      let(:attributes) { { target_id: issue2.id, category: "reference" }}
      action { post :create, params: { project_id: project.id, issue_id: issue.id, issue_relationship: attributes } }

      it { is_expected.to respond_with :redirect
           expect(issue.state.closed?).to be_falsy }
    end
  end

  describe "DELETE destroy" do
    let!(:issue_relationship) { create :issue_relationship, source: issue, target: issue2, member: member }

    action(skip: true) { delete :destroy, params: { project_id: project.id, issue_id: issue.id, id: issue_relationship.id } }

    it { expect { do_action }.to change { IssueRelationship.count }.by(-1) }
  end
end
