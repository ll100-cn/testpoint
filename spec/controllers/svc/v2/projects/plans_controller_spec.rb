require 'rails_helper'

RSpec.describe Svc::V2::Projects::PlansController, type: :controller do
  let!(:project) { create :project }
  let!(:platform) { create :platform, project: project }
  let!(:user) { create :user }
  let!(:member) { create :member, user: user, project: project }
  let!(:plan) { create :plan, project: project, creator: member }
  let!(:phase) { create :phase, plan: plan, index: 0 }
  let!(:role_name) { "teacher" }
  let!(:test_case) { create :test_case, project: project, platforms: [platform], role_name: role_name }
  let!(:task) { create :task, test_case: test_case, plan: plan }
  before { sign_in user }

  describe "GET index" do
    action { get :index, params: { project_id: project.id }, format: :json }
    it { is_expected.to respond_with :success }
  end

  describe "POST create" do
    let(:plan_attributes) { { title: "iOS 2.11.3", platform_id: platform.id } }
    action { post :create, params: { project_id: project.id }.merge(plan_attributes), format: :json }
    it { is_expected.to respond_with :success }

    context "when role_names is given" do
      let(:plan_attributes) { { title: "iOS 2.11.3", platform_id: platform.id, role_names: [role_name] } }
      it { is_expected.to respond_with :success
           plan = Plan.last
           expect(plan.tasks.where(test_case_id: test_case.id).take).not_to be_nil }
    end

    context "when role_names is invalid" do
      let(:plan_attributes) { { title: "iOS 2.11.3", platform_id: platform.id, role_names: ["invalid"] } }
      it { is_expected.to respond_with :success
           plan = Plan.last
           expect(plan.tasks.where(test_case_id: test_case.id).take).to be_nil }
    end
  end
end
