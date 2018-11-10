require 'rails_helper'

RSpec.describe Projects::MembersController, type: :controller do
  let!(:user) { create :user }
  let!(:project) { create :project }
  let!(:member) { create :member, :manager, project: project, user: user }
  login_superadmin

  describe "GET index" do
    action { get :index, params: { project_id: project.id } }
    it { is_expected.to respond_with :success }
  end

  describe "GET new" do
    action { get :new, params: { project_id: project.id } }
    it { is_expected.to respond_with :success }
  end

  describe "POST create" do
    let!(:user) { create :user }
    let(:attributes) { { role: "developer", name: "hello", email: user.email } }

    context "when member exists" do
      action { post :create, params: { member: attributes, project_id: project.id } }

      it { is_expected.to respond_with :success }
    end

    context "when member doesn't exist" do
      before { attributes[:email] = "testpoint@gmail.com" }
      action { post :create, params: { member: attributes, project_id: project.id } }

      it { is_expected.to respond_with :success }
    end

    context "when name is invalid" do
      before { attributes[:name] = "1" }
      before { attributes[:email] = "test" }
      action { post :create, params: { member: attributes, project_id: project.id } }

      it { expect(assigns[:member].errors).not_to be_empty }
    end
  end

  describe "GET edit" do
    action { get :edit, params: { id: member.id, project_id: project.id } }
    it { is_expected.to respond_with :success }
  end

  describe "POST update" do
    let(:attributes) { { role: "owner", nickname: "" } }
    action { post :update, params: { id: member.id, member: attributes, project_id: project.id } }
    it { is_expected.to respond_with :redirect }
  end

  describe "DELETE destroy" do
    action(skip: true) { delete :destroy, params: { id: member.id, project_id: project.id } }
    it { expect { do_action }.to change { Member.count }.by(-1) }
  end
end
