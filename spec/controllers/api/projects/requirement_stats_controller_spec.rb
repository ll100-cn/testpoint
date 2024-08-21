require 'rails_helper'

RSpec.describe Api::Projects::RequirementStatsController, type: :controller do
  let!(:project) { create :project }
  let(:superadmin) { create :user, :superadmin }
  let!(:member) { create :member, user: superadmin, project: project }
  let!(:storyboard) { create :storyboard, project: project }

  before { sign_in superadmin }

  describe "GET index" do
    action { get :index, params: { project_id: project.id, storyboard_id: storyboard.id }, format: :json }
    it { is_expected.to respond_with :success }
  end
end
