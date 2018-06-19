require 'rails_helper'

RSpec.describe ProjectsController, type: :controller do
  let!(:user) { create :user }
  let!(:project) { create :project }
  login_admin

  describe "GET index" do
    action { get :index }
    it { is_expected.to respond_with :success }
  end

  describe "GET new" do
    action { get :new }
    it { is_expected.to respond_with :success }
  end

  describe "POST create" do
    let(:attributes) { { name: "it is a project" } }
    action { post :create, params: { project: attributes } }
    it { is_expected.to respond_with :redirect }
  end

  describe "GET edit" do
    action { get :edit, params: { id: project.id } }
    it { is_expected.to respond_with :success }
  end

  describe "POST update" do
    let(:attributes) { { name: "updated project", member_ids: [user.id] } }
    action { post :update, params: { id: project.id, project: attributes } }
    it { is_expected.to respond_with :redirect }
  end

  describe "GET show" do
    action { get :show, params: { id: project.id } }
    it { is_expected.to respond_with :success }
  end

  describe "DELETE destroy" do
    action(skip: true) { delete :destroy, params: { id: project.id } }
    it { expect { do_action }.to change { Project.count }.by(-1) }
  end

  describe "Post remove_member" do
    let!(:project) { create :project, members: [user] }
    action { post :remove_member, params: { id: project.id, user_id: user.id } }
    it { is_expected.to respond_with :redirect }
  end
end
