require 'rails_helper'

RSpec.describe TasksController, type: :controller do
  describe "PUT update" do
    let(:task) { create :task }
    let(:plan) { task.plan }

    context "state pass" do
      action { put :update, params: { plan_id: plan, id: task, task: { state: :pass } } }

      it { expect(task.reload.state).to eq :pass }
    end

    context "state failure" do
      action { put :update, params: { plan_id: plan, id: task, task: { state: :failure } } }

      it { expect(task.reload.state).to eq :failure }
    end
  end
end
