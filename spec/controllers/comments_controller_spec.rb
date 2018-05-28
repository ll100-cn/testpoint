require 'rails_helper'

RSpec.describe CommentsController, type: :controller do
  let!(:issue) { create :issue }
  let!(:user) { create :user }
  let!(:comment) { create :comment, issue: issue, user: user }

  describe "POST create" do
    let(:attributes) { { content: "comment create" } }
    action { post :create, xhr: true, params: { comment: attributes, issue_id: issue.id } }
    it { is_expected.to respond_with :success }
  end

  describe "DELETE destroy" do
    action(skip: true) { delete :destroy, xhr: true, params: { id: comment.id, issue_id: issue.id } }
    it { expect { do_action }.to change { Comment.count }.by(-1) }
  end
end
