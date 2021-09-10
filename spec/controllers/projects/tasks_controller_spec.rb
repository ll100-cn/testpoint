require 'rails_helper'

RSpec.describe Projects::TasksController, type: :controller do
  let!(:project) { create :project }
  let!(:platform) { create :platform, project: project }
  let!(:user) { create :user}
  let!(:member) { create :member, user: user, project: project }
  let(:plan) { create :plan, project: project, creator: member }
  let!(:phase) { create :phase, plan: plan, index: 0 }
  let!(:folder) { create :folder, project: project }
  let!(:test_case) { create :test_case, project: project, folder: folder, platforms: [platform] }
  let!(:task) { create :task, test_case: test_case, plan: plan }
  let(:task_attributes) { {} }
  let(:issue) { create :issue, title: "it is a issue", project: project }
  login_superadmin
  before { sign_in user }
end
