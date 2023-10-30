require 'rails_helper'

RSpec.describe Api::Projects::CommentsController, type: :controller do
  let!(:project) { create :project }
  let!(:issue) { create :issue, project: project }
  let!(:user) { create :user, :superadmin }
  let!(:member) { create :member, user: user, project: project }
  let!(:comment) { create :comment, issue: issue, member: member }
  before { sign_in user }

  describe "GET index" do
    action { get :index, params: { project_id: project.id, issue_id: issue.id, id: comment.id }, format: :json }

    it { is_expected.to respond_with :success }
  end

  describe "POST create" do
    action { post :create, params: { content: "comment create", issue_id: issue.id, project_id: project.id }, format: :json }
    it { is_expected.to respond_with :success }
    context "issue state is pending and commmentor is issue creator" do
      before { issue.update!(state: :waiting, creator_id: member.id) }
      it { expect(issue.reload.creator).to eq member
           expect(issue.activities.last.after_value).to eq 'pending' }
    end
  end

  describe "PUT update" do
    action { put :update, params: { project_id: project.id, issue_id: issue.id, id: comment.id, content: "comment update" }, format: :json }
    it { is_expected.to respond_with :success }
  end

  describe "DELETE destroy" do
    action { delete :destroy, params: { project_id: project.id, issue_id: issue.id, id: comment.id }, format: :json }

    it { is_expected.to respond_with :success }
  end
end
