require 'rails_helper'

RSpec.describe Projects::CommentsController, type: :controller do
  let!(:project) { create :project }
  let!(:issue) { create :issue, project: project }
  let!(:user) { create :user }
  let!(:comment) { create :comment, issue: issue, user: user }

  describe "POST create" do
    login_user
    let(:attributes) { { content: "comment create" } }
    action { post :create, params: { comment: attributes, issue_id: issue.id, project_id: project.id } }
    it { is_expected.to respond_with :redirect }
  end
end
