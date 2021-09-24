require 'rails_helper'

RSpec.describe Projects::CategoriesController, type: :controller do
  let!(:project) { create :project }
  let!(:category) { create :category, project: project }
  let!(:issue) { create :issue, project: project, category: category }
  login_superadmin

  describe "GET index" do
    action { get :index, params: { project_id: project.id }, format: :xhrml }
    it { is_expected.to respond_with :success }
  end

  describe "GET new" do
    action { get :new, params: { project_id: project.id }, format: :xhrml }
    it { is_expected.to respond_with :success }
  end

  describe "POST create" do
    let(:attributes) { { name: "bug", description: "it is a bug", color: "#ace0ef" } }
    action { post :create, params: { category: attributes, project_id: project.id } }
    it { is_expected.to respond_with :redirect }
  end

  describe "PUT update" do
    let(:attributes) { { name: "help wanted" } }
    action { put :update, params: { id: category.id, category: attributes, project_id: project.id } }
    it { is_expected.to respond_with :redirect }
  end

  describe "DELETE destroy" do
    action(skip: true) { delete :destroy, params: { id: category.id, project_id: project.id } }
    it { expect { do_action }.to change { Category.count }.by(-1) }
  end
end
