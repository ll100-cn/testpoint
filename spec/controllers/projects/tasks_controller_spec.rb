require 'rails_helper'

RSpec.describe Projects::TasksController, type: :controller do
  let!(:project) { create :project }
  let(:plan) { create :plan, project: project }
  let(:task) { plan.tasks.first }
  let(:task_attributes) { {} }

  describe "PUT update" do
    action { put :update, params: { project_id: project.id, plan_id: plan, id: task, task: task_attributes, format: :xhrml } }

    context "state pass" do
      before { task_attributes[:state] = :pass }
      it { expect(task.reload.state).to eq :pass }
    end

    context "state failure with attachment" do
      let(:task_attachment) { build :task_attachment }
      before {
        task_attributes[:state] = :failure
        task_attributes[:task_attachments_attributes] = [task_attachment.attributes]
      }

      it {
        expect(task.reload.state).to eq :failure
        expect(task.task_attachments.count).to eq 1
      }
    end

    context "relate issue" do
      context "success" do
        let(:project) { create :project }
        let(:issue) { create :issue, project: project }
        before { task_attributes[:issue_id] = issue.id }

        it { expect(task.reload.issue).to eq issue }
      end

      context "when issue_id invalid" do
        before {
          Issue.destroy_all
          task_attributes[:issue_id] = 1
        }

        it { expect(assigns(:task).errors[:issue_id].count).to eq 1 }
      end
    end
  end

  describe "GET change_state" do
    action { get :change_state, params: { project_id: project.id, plan_id: plan, id: task, task: task_attributes, format: :xhrml } }
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
    action { get :edit, params: { project_id: project.id, plan_id: plan, id: task, task: task_attributes, format: :xhrml } }
    it { is_expected.to respond_with(:success) }
  end
end
