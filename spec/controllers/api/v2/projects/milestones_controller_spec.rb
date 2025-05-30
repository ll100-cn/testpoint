require 'rails_helper'

RSpec.describe Api::V2::Projects::MilestonesController, type: :controller do
  let!(:project) { create :project }
  let!(:milestone) { create :milestone, project: project }
  let!(:test_case) { create :test_case, project: project }
  let(:superadmin) { create :user, :superadmin }
  before { sign_in superadmin }

  describe "GET index" do
    action { get :index, params: { project_id: project.id }, format: :json }
    it { is_expected.to respond_with :success }
  end

  describe "POST create" do
    action { post :create, params: { title: "2020第一季度新功能", project_id: project.id }, format: :json }
    it { is_expected.to respond_with :success }
  end

  describe "PUT update" do
    action { put :update, params: { id: milestone.id, title: "help wanted", project_id: project.id }, format: :json }
    it { is_expected.to respond_with :success }
  end

  describe "DELETE destroy" do
    action(skip: true) { delete :destroy, params: { id: milestone.id, project_id: project.id }, format: :json }
    it { expect { do_action }.to change { Milestone.where(archived_at: nil).count }.by(-1) }
  end

  describe "PATCH archive" do
    action { patch :archive, params: { id: milestone.id, project_id: project.id }, format: :json }
    it { is_expected.to respond_with :success
         expect(milestone.reload.archived_at).not_to be_nil }
  end

  describe "PATCH active" do
    action { patch :active, params: { id: milestone.id, project_id: project.id }, format: :json }
    it { is_expected.to respond_with :success
         expect(milestone.reload.archived_at).to be_nil }
  end
end