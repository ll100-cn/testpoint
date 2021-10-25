require 'rails_helper'

RSpec.describe ProjectsController, type: :controller do
  let!(:user) { create :user, :superadmin }
  let!(:project) { create :project }
  let!(:member) { create :member, user: user, project: project }
  before { sign_in user }

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
    it { is_expected.to respond_with :redirect }
  end

  describe "PATCH archive" do
    action(skip: true) { patch :archive, params: { id: project.id } }
    it { expect { do_action }.to change { Project.available.count }.by(-1) }
  end
end
