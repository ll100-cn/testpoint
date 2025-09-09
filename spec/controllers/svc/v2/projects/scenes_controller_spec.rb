require 'rails_helper'

RSpec.describe Svc::V2::Projects::ScenesController, type: :controller do
  let!(:project) { create :project }
  let(:superadmin) { create :user, :superadmin }
  let!(:member) { create :member, user: superadmin, project: project }
  let(:storyboard) { create :storyboard, title: "title", description: "description", main_axle: 'LR', project: project }
  let(:scene) { create :scene, name: "title", storyboard: storyboard }

  before { sign_in superadmin }

  describe "GET index" do
    action { get :index, params: { project_id: project.id, storyboard_id: storyboard.id }, format: :json }
    it { is_expected.to respond_with :success }
  end

  describe "POST create" do
    action { post :create, params: { project_id: project.id, storyboard_id: storyboard.id, name: "title" }, format: :json }

    it { is_expected.to respond_with(:success) }
  end

  describe "PATCH update" do
    action { patch :update, params: { project_id: project.id, storyboard_id: storyboard.id, id: scene.id, name: "title" }, format: :json }

    it { is_expected.to respond_with(:success) }
  end

  describe "DELETE destroy" do
    action { delete :destroy, params: { project_id: project.id, storyboard_id: storyboard.id, id: scene.id }, format: :json }

    it { is_expected.to respond_with(:success) }
  end
end
