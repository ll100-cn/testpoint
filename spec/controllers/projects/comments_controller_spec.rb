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
end
