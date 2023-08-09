require 'rails_helper'

RSpec.describe Projects::TestCaseLabelsController, type: :controller do
  let!(:project) { create :project }
  let!(:test_case_label) { create :test_case_label, project: project }
  let!(:test_case) { create :test_case, project: project, label_ids: [ test_case_label.id ] }
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
    action { get :edit, format: :xhrml, params: { id: test_case_label.id, project_id: project.id } }
    it { is_expected.to respond_with :success }
  end

  describe "POST create" do
    let(:attributes) { { name: "会员功能", description: "会员专属功能" } }
    action { post :create, params: { test_case_label: attributes, project_id: project.id } }
    it { is_expected.to respond_with :redirect }
  end

  describe "PUT update" do
    let(:attributes) { { name: "help wanted" } }
    action { put :update, params: { id: test_case_label.id, test_case_label: attributes, project_id: project.id } }
    it { is_expected.to respond_with :redirect }
  end

  describe "DELETE destroy" do
    action(skip: true) { delete :destroy, params: { id: test_case_label.id, project_id: project.id } }
    it { expect { do_action }.to change { TestCaseLabel.count }.by(-1) }
  end
end
