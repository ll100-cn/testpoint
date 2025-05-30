require 'rails_helper'

RSpec.describe Api::V2::Projects::IssueActionsController, type: :controller do
  let!(:project) { create :project }
  let!(:platform) { create :platform, project: project }
  let!(:user) { create :user }
  let!(:member) { create :member, user: user, project: project }
  let(:plan) { create :plan, project: project, creator: member }
  let!(:phase) { create :phase, plan: plan, index: 0 }
  let!(:test_case) { create :test_case, project: project, platforms: [platform] }
  let!(:task) { create :task, test_case: test_case, plan: plan }
  let(:issue) { create :issue, project: project }
  let(:superadmin) { create :user, :superadmin }
  let!(:owner) { create :member, :owner, project: project, user: superadmin }
  let!(:manager) { create :member, :manager, project: project }
  let!(:template) { create :issue_template, project: project }
  before { sign_in superadmin }

  describe "POST create" do
    context "update with valid attributes" do
      let(:attributes) { { title: "issue update", content: "hello" } }
      action { post :create, params: { issue_id: issue.id, project_id: project.id }.merge(attributes), format: :json }

      it { is_expected.to respond_with :success }
    end

    context "update with invalid attributes" do
      let!(:attributes) { { title: "" } }
      action { post :create, params: { issue_id: issue.id, project_id: project.id }.merge(attributes), format: :json }

      it { expect(issue.title).not_to be_empty }
    end

    context "update with state processed" do
      let(:attributes) { { state: "confirmed" } }
      action { post :create, params: { issue_id: issue.id, project_id: project.id }.merge(attributes), format: :json }

      it { is_expected.to respond_with :success
           expect(issue.reload.state).to eq "confirmed" }
    end

    context "assigning" do
      let(:attributes) { { assignee_id: owner } }
      action { post :create, params: { issue_id: issue.id, project_id: project.id }.merge(attributes), format: :json }

      it { is_expected.to respond_with :success
           expect(issue.reload.assignee_id).to eq owner.id }
    end
  end
end
