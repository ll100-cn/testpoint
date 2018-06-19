require 'rails_helper'

RSpec.describe PlatformsController, type: :controller do
  let!(:project) { create :project }
  let!(:platform) { create :platform, project: project }
  login_admin

  describe "GET new" do
    action { get :new, params: { project_id: project.id } }
    it { is_expected.to respond_with :success }
  end

  describe "POST create" do
    let(:attributes) { { name: "iOS" } }
    action { post :create, params: { platform: attributes, project_id: project.id } }
    it { is_expected.to respond_with :redirect }
  end

  describe "PUT update" do
    let(:attributes) { { name: "Android" } }
    action { put :update, params: { id: platform, platform: attributes, project_id: project.id } }
    it { is_expected.to respond_with :redirect }
  end

  describe "DELETE destroy" do
    action(skip: true) { delete :destroy, params: { id: platform.id, project_id: project.id } }
    it { expect { do_action }.to change { Platform.archived.count }.by(1) }
  end
end
