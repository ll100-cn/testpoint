require 'rails_helper'

RSpec.describe MembersController, type: :controller do
  let!(:user1) { create :user }
  let!(:user2) { create :user }
  let!(:project) { create :project, members: [user1, user2] }
  login_admin

  describe "GET index" do
    action { get :index, params: { project_id: project.id } }
    it { is_expected.to respond_with :success }
  end
end
