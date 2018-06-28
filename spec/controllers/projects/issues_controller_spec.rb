require 'rails_helper'

RSpec.describe Projects::IssuesController, type: :controller do
  let!(:project) { create :project }
  let(:plan) { create :plan }
  let(:task) { plan.tasks.first }
  let(:issue) { create :issue, project: project }
  login_superadmin

  describe "GET index" do
    let!(:label) { create :label }
    let!(:issue) { create :issue, label_ids: [label.id], project: project }
    action { get :index, params: { project_id: project.id } }
    it { is_expected.to respond_with :success }
  end

  describe "GET new" do
    action { get :new, params: { task_id: task.id, project_id: project.id } }
    it { is_expected.to respond_with :success }
  end

  describe "POST create" do
    let(:attributes) { { title: "issue create", content: "content for issue" } }
    action { post :create, params: { issue: attributes, task_id: task.id, project_id: project.id } }
    it { is_expected.to respond_with :redirect }
  end

  describe "PUT update" do
    let(:attributes) { { title: "issue update" } }
    action { put :update, params: { id: issue.id, issue: attributes, project_id: project.id } }
    it { is_expected.to respond_with :redirect }
  end

  describe "GET show" do
    context "without comments" do
      action { get :show, params: { id: issue.id, project_id: project.id } }
      it { is_expected.to respond_with :success }
    end

    context "with comments" do
      let!(:comment) { create :comment, content: "<p>this is a comment</p>", issue: issue }
      action { get :show, params: { id: issue.id, project_id: project.id } }
      it { is_expected.to respond_with :success }
    end
  end
end
