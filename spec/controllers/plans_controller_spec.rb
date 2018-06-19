require 'rails_helper'

RSpec.describe PlansController, type: :controller do
  let!(:project) { create :project }
  let!(:plan) { create :plan, project: project }
  let!(:test_case) { create :test_case, project: project }
  let!(:task) { create :task, test_case: test_case, plan: plan, project: project }
  login_admin

  describe "GET index" do
    action { get :index, params: { project_id: project.id } }
    it { is_expected.to respond_with :success }
  end

  describe "GET new" do
    action { get :new, params: { project_id: project.id } }
    it { is_expected.to respond_with :success }
  end

  describe "POST create" do
    let(:attributes) { { title: "user change password" } }
    action { post :create, params: { plan: attributes, project_id: project.id } }
    it { is_expected.to respond_with :redirect }
  end

  describe "PUT update" do
    let(:attributes) { { title: "user sign out" } }
    action { put :update, params: { id: plan.id, plan: attributes, project_id: project.id } }
    it { is_expected.to respond_with :redirect }
  end

  describe "GET show" do
    action { get :show, params: { id: plan.id, project_id: project.id } }
    it { is_expected.to respond_with :success }
  end

  describe "DELETE destroy" do
    action(skip: true) { delete :destroy, params: { id: plan.id, project_id: project.id } }
    it { expect { do_action }.to change { Plan.archived.count }.by(1) }
  end
end
