require 'rails_helper'

RSpec.describe Projects::PhasesController, type: :controller do
  let!(:project) { create :project }
  let!(:user) { create :user}
  let!(:member) { create :member, user: user, project: project }
  let(:plan) { create :plan, project: project, creator: member }
  let!(:phase) { create :phase, plan: plan, index: 0 }
  let(:phase_attributes) { {} }
  login_superadmin
  before { sign_in user }

  describe "GET new" do
    action { get :new, params: { project_id: project.id, plan_id: plan, format: :xhrml } }
    it { is_expected.to respond_with(:success) }
  end

  describe "POST create" do
    action { post :create, params: { project_id: project.id, plan_id: plan, phase: phase_attributes } }
    it { is_expected.to respond_with(:redirect) }
  end
end
