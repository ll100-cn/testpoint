require 'rails_helper'

RSpec.describe Api::V2::Admin::ProjectsController, type: :controller do
  let!(:user) { create :user, :superadmin }
  let!(:project) { create :project }
  let!(:member) { create :member, user: user, project: project }
  before { sign_in user }

  describe "GET index" do
    action { get :index, format: :json }
    it { is_expected.to respond_with :success }
  end

  describe "POST create" do
    action { post :create, params: { name: "it is a project" }, format: :json }
    it { is_expected.to respond_with :success }
  end

  describe "POST update" do
    action { post :update, params: { id: project.id, name: "updated project", member_ids: [user.id] }, format: :json }
    it { is_expected.to respond_with :success }
  end

  describe "GET show" do
    action { get :show, params: { id: project.id }, format: :json }
    it { is_expected.to respond_with :success }
  end

  describe "DELETE destroy" do
    action(skip: true) { delete :destroy, params: { id: project.id }, format: :json }
    it { expect { do_action }.to change { Project.available.count }.by(-1) }
  end
end
