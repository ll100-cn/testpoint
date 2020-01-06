require 'rails_helper'

RSpec.describe Projects::FoldersController, type: :controller do
  let!(:project) { create :project }
  let!(:folder) { create :folder, project: project }
  login_superadmin

  describe "GET new" do
    action { get :new, params: { project_id: project.id } }
    it { is_expected.to respond_with :success }
  end

  describe "POST create" do
    let(:attributes) { { name: "new folder name" } }
    action { post :create, params: { folder: attributes, project_id: project.id } }
    it { is_expected.to respond_with :redirect }
  end

  describe "PUT update" do
    let(:attributes) { { name: "new name" } }
    action { put :update, params: { id: folder.id, folder: attributes, project_id: project.id } }
    it { is_expected.to respond_with :redirect }
  end

  describe "DELETE destroy" do
    action(skip: true) { delete :destroy, params: { id: folder.id, project_id: project.id } }
    it { expect { do_action }.to change { Folder.count }.by(-1) }
  end

  describe "PATCH archive" do
    action { patch :archive, params: { project_id: project.id, id: folder.id } }
    it { is_expected.to respond_with :redirect }
  end
end
