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
  let!(:task) { create :task, test_case: test_case, plan: plan, phase: phase }
  let(:task_attributes) { {} }
  let(:issue) { create :issue, title: "it is a issue", project: project }
  login_superadmin
  before { sign_in user }

  describe "PUT update" do
    action { put :update, params: { project_id: project.id, plan_id: plan, id: task, task: task_attributes, format: :xhrml } }

    context "state pass" do
      before { task_attributes[:state] = :pass }
      it { expect(task.reload.state).to eq :pass }
    end

    context "state failure with attachment" do
      let(:attachment) { create :attachment }
      before {
        task_attributes[:state] = :failure
        task_attributes[:issues_attributes] = { "0": { title: "测试错误", content: "如题" } }
      }

      it {
        expect(task.reload.state).to eq :failure
        expect(task.issues.count).to eq 1
      }
    end
  end

  describe "GET show" do
    action { get :show, params: { project_id: project.id, plan_id: plan, id: task, task: task_attributes, format: :xhrml } }
    it { is_expected.to respond_with(:success) }
  end

  describe "GET upload_attachment" do
    action { get :upload_attachment, params: { project_id: project.id, plan_id: plan, id: task, task: task_attributes, format: :xhrml } }
    it { is_expected.to respond_with(:success) }
  end

  describe "GET edit" do
    action { get :edit, params: { project_id: project.id, plan_id: plan, id: task, task: task_attributes, format: :xhrml } }
    it { is_expected.to respond_with(:success) }
  end

  describe "GET relate" do
    action { get :related_issues, params: { project_id: project.id, plan_id: plan, id: task } }
    it { is_expected.to respond_with(:success) }
  end
end
