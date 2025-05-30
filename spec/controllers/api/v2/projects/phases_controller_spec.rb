require 'rails_helper'

RSpec.describe Api::V2::Projects::PhasesController, type: :controller do
  let!(:project) { create :project }
  let(:superadmin) { create :user, :superadmin }
  let!(:member) { create :member, user: superadmin, project: project }
  let(:plan) { create :plan, project: project, creator: member }
  let!(:phase) { create :phase, plan: plan, index: 0 }
  before { sign_in superadmin }

  describe "POST create" do
    action { post :create, params: { project_id: project.id, plan_id: plan.id, title: "第 2 轮" }, format: :json }
    it { is_expected.to respond_with(:success) }
  end
end
