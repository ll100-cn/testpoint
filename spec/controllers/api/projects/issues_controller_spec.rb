require 'rails_helper'

RSpec.describe Api::Projects::IssuesController, type: :controller do
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

  describe "GET index" do
    let!(:category) { create :category }
    let!(:issue) { create :issue, category: category, project: project }
    let!(:attributes) { { project_id: project.id } }
    action { get :index, params: attributes, format: :json }

    context "without task" do
      it { is_expected.to respond_with :success }
    end

    context "with related_task" do
      before { attributes[:related_task] = task.id }

      it { is_expected.to respond_with :success }
    end

    context "filter by states" do
      before { attributes[:filter] = "develop" }

      it { is_expected.to respond_with :success }
    end

    context "filter by states" do
      context "filter opending issues" do
        before { attributes[:q] = { "state_filter" => "opening" } }

        it { is_expected.to respond_with :success }
      end
      context "filter all issues" do
        before { attributes[:q] = { "state_filter" => "all" } }

        it { is_expected.to respond_with :success }
      end

      context "filter resolved issues" do
        before { attributes[:q] = { "state_filter" => "resolved" } }

        it { is_expected.to respond_with :success }
      end
    end
  end

  describe "POST create" do
    let!(:title) { "issue title create" }
    let(:attributes) { { issue_attributes: { title: title, content: "content for issue" } } }
    action { post :create, params: attributes.merge({ project_id: project.id,
      issue_template_id: template.id }), format: :json }

    context "assignee other members as creator" do
      let!(:user) { create :user }
      let!(:member) { create :member, project: project, user: user }
      before { attributes[:creator_id] = member.id }

      it { is_expected.to respond_with :success
           expect(Issue.count).to eq 1
           expect(Issue.last.title).to eq title }
    end

    context "admin create the issue" do
      before { attributes[:title] =  "Mail delivery test" }
      it { is_expected.to respond_with :success
           expect(Issue.count).to eq 1
           expect(Issue.last.title).to eq title }
    end
  end

  describe "GET show" do
    action { get :show, params: { project_id: project.id, id: issue.id }, format: :json }
    it { is_expected.to respond_with :success }
  end

  describe "PUT update" do
    context "update with valid attributes" do
      let(:attributes) { { title: "issue update", content: "hello" } }
      action { put :update, params: { id: issue.id, project_id: project.id }.merge(attributes), format: :json }

      it { is_expected.to respond_with :success }
    end

    context "update with invalid attributes" do
      let!(:attributes) { { title: "" } }
      action { put :update, params: { id: issue.id, project_id: project.id }.merge(attributes), format: :json }

      it { expect(issue.title).not_to be_empty }
    end

    context "update with state processed" do
      let(:attributes) { { state: "confirmed" } }
      action { put :update, params: { id: issue.id, project_id: project.id }.merge(attributes), format: :json }

      it { is_expected.to respond_with :success
           expect(issue.reload.state).to eq "confirmed" }
    end

    context "assigning" do
      let(:attributes) { { assignee_id: owner } }
      action { put :update, params: { id: issue.id, project_id: project.id }.merge(attributes), format: :json }

      it { is_expected.to respond_with :success
           expect(issue.reload.assignee_id).to eq owner.id }
    end
  end

  describe "PATCH archived" do
    action { patch :archive, params: { project_id: project.id, id: issue.id }, format: :json }
    it { is_expected.to respond_with :success
         expect(issue.reload.archived_at).not_to be_nil }
  end

  describe "DELETE destroy" do
    action { delete :destroy, params: { project_id: project.id, id: issue.id }, format: :json }
    it { is_expected.to respond_with :success }
  end
end
