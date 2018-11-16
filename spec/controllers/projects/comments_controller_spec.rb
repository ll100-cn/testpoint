require 'rails_helper'

RSpec.describe Projects::CommentsController, type: :controller do
  let!(:project) { create :project }
  let!(:issue) { create :issue, project: project }
  let!(:user) { create :user }
  let!(:comment) { create :comment, issue: issue, user: user }
  login_superadmin

  describe "POST create" do
    let(:attributes) { { content: "comment create" } }
    action { post :create, params: { comment: attributes, issue_id: issue.id, project_id: project.id } }
    it { is_expected.to respond_with :redirect }
  end

  describe "PUT update" do
    let(:attributes) { { content: "comment update" } }
    action { put :update, params: { project_id: project.id, issue_id: issue.id, id: comment.id, comment: attributes } }
    it { is_expected.to respond_with :redirect }
  end

  describe "DELETE destroy" do
    action { delete :destroy, params: { project_id: project.id, issue_id: issue.id, id: comment.id } }

    it { is_expected.to respond_with :redirect }
  end

  describe "GET unfold" do
    before { comment.update(collapsed: false) }
    action { get :unfold, params: { project_id: project.id, issue_id: issue.id, id: comment.id, format: :xhrml } }

    it { is_expected.to respond_with :success
         expect(comment.reload.collapsed).to be_truthy }
  end

  describe "GET fold" do
    before { comment.update(collapsed: true) }
    action { get :fold, params: { project_id: project.id, issue_id: issue.id, id: comment.id, format: :xhrml } }

    it { is_expected.to respond_with :success
         expect(comment.reload.collapsed).to be_falsy }
  end
end
