require 'rails_helper'

RSpec.describe Projects::PlansController, type: :controller do
  let!(:project) { create :project }
  let!(:platform) { create :platform, project: project }
  let!(:user) { create :user }
  let!(:member) { create :member, user: user, project: project }
  let!(:plan) { create :plan, project: project, creator: member }
  let!(:phase) { create :phase, plan: plan, index: 0 }
  let!(:test_case) { create :test_case, project: project, platforms: [platform] }
  let!(:task) { create :task, test_case: test_case, plan: plan }
  before { sign_in user }

  describe "GET index" do
    action { get :new, params: { project_id: project.id, format: :xhrml } }
    it { is_expected.to respond_with :success }
  end

  describe "GET index" do
    action { get :index, params: { project_id: project.id } }
    it { is_expected.to respond_with :success }
  end

  describe "POST create" do
    let(:plan_attributes) { { title: "iOS 2.11.3", platform_id: platform.id } }
    let(:filter_attributes) { { folder_ids: project.folders.map(&:id) } }
    action { post :create, params: { plan: plan_attributes, filter: filter_attributes, project_id: project.id } }
    it { is_expected.to respond_with :redirect }
  end

  describe "PUT update" do
    let(:attributes) { { title: "user sign out" } }
    action { put :update, params: { id: plan.id, plan: attributes, project_id: project.id } }
    it { is_expected.to respond_with :redirect }
  end

  describe "GET show" do
    action { get :show, params: { id: plan.id, project_id: project.id, phase_index: 0 } }
    it { is_expected.to respond_with :success }
  end

  describe "DELETE destroy" do
    action(skip: true) { delete :destroy, params: { id: plan.id, project_id: project.id } }
    it { expect { do_action }.to change { Plan.archived.count }.by(1) }
  end
end
