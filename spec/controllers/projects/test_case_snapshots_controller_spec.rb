require 'rails_helper'

RSpec.describe Projects::TestCaseSnapshotsController, type: :controller do
  let!(:project) { create :project }
  let!(:test_case_snapshot) { create :test_case_snapshot, project: project, version_at: Time.current }
  let!(:test_case) { create :test_case, project: project }
  login_superadmin

  describe "GET index" do
    action { get :index, format: :xhrml, params: { project_id: project.id } }
    it { is_expected.to respond_with :success }
  end

  describe "GET new" do
    action { get :new, format: :xhrml, params: { project_id: project.id } }
    it { is_expected.to respond_with :success }
  end

  describe "GET edit" do
    action { get :edit, format: :xhrml, params: { id: test_case_snapshot.id, project_id: project.id } }
    it { is_expected.to respond_with :success }
  end

  describe "POST create" do
    let(:attributes) { { title: "2020第一季度新功能" } }
    action { post :create, params: { test_case_snapshot: attributes, project_id: project.id } }
    it { is_expected.to respond_with :redirect }
  end

  describe "PUT update" do
    let(:attributes) { { title: "help wanted" } }
    action { put :update, params: { id: test_case_snapshot.id, test_case_snapshot: attributes, project_id: project.id } }
    it { is_expected.to respond_with :redirect }
  end

  describe "DELETE destroy" do
    action(skip: true) { delete :destroy, params: { id: test_case_snapshot.id, project_id: project.id } }
    it { expect { do_action }.to change { TestCaseSnapshot.count }.by(-1) }
  end
end