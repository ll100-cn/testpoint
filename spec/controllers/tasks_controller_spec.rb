require 'rails_helper'

RSpec.describe TasksController, type: :controller do
  describe "PUT update" do
    let(:task) { create :task }
    let(:plan) { task.plan }
    let(:task_attributes) { {} }

    action { put :update, params: { plan_id: plan, id: task, task: task_attributes, format: :xhrml } }

    context "state pass" do
      before { task_attributes[:state] = :pass }
      it { expect(task.reload.state).to eq :pass }
    end

    context "state failure" do
      before { task_attributes[:state] = :failure }
      it { expect(task.reload.state).to eq :failure }
    end
  end
end
