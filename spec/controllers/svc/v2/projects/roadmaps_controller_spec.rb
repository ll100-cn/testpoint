require 'rails_helper'

RSpec.describe Svc::V2::Projects::RoadmapsController, type: :controller do
  let!(:project) { create :project }
  let(:superadmin) { create :user, :superadmin }
  let!(:member) { create :member, user: superadmin, project: project }
  let(:roadmap) { create :roadmap, title: "title", project: project }

  before { sign_in superadmin }

  describe "GET index" do
    action { get :index, params: { project_id: project.id }, format: :json }
    it { is_expected.to respond_with :success }
  end

  describe "POST create" do
    action { post :create, params: { project_id: project.id, title: "title" }, format: :json }

    it { is_expected.to respond_with(:success) }
  end

  describe "PATCH update" do
    action { patch :update, params: { project_id: project.id, id: roadmap.id, title: "title" }, format: :json }

    it { is_expected.to respond_with(:success) }
  end
end
