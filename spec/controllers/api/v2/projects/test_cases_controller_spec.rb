require 'rails_helper'

RSpec.describe Api::V2::Projects::TestCasesController, type: :controller do
  let!(:user) { create :user }
  let!(:project) { create :project }
  let!(:platform) { create :platform }
  let!(:member) { create :member, user: user, role: :manager, project: project }
  before { sign_in user }

  describe "GET index" do
    action { get :index, params: { project_id: project.id }, format: :json }
    it { is_expected.to respond_with :success }
  end

  describe "POST create" do
    action { post :create, params: { project_id: project.id, title: "test", role_name: "test", scene_name: "test", platform_ids: [Platform.first.id] }, format: :json }
    it { is_expected.to respond_with :success
         expect(TestCase.last.title).to eq "test" }
  end
end
