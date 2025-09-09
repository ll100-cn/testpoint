require 'rails_helper'

RSpec.describe Svc::V2::Projects::SubscriptionsController, type: :controller do
  let!(:project) { create :project }
  let(:issue) { create :issue, project: project }
  let!(:superadmin) { create :user, :superadmin }
  let!(:subscription) { create :subscription, user_id: superadmin.id, issue_id: issue.id }
  let!(:member) { create :member, project: project, user: superadmin }
  before { sign_in superadmin }

  describe "POST create" do
    action { post :create, params: { project_id: project.id, issue_id: issue.id }, format: :json }
    it { is_expected.to respond_with :success }
  end

  describe "DELETE destroy" do
    action(skip: true) { delete :destroy, params: { project_id: project.id, issue_id: issue.id, id: subscription.id }, format: :json }
    it { expect { do_action }.to change { Subscription.count }.by(-1) }
  end
end
