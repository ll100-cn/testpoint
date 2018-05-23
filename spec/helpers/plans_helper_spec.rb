require 'rails_helper'

RSpec.describe PlansHelper, :type => :helper do
  describe "#task_state_with_icon" do
    context "when state is pending" do
      let(:task) { create :task, state: "pending" }
      pending = "<span class=\"text-muted\">Pending <span class='fa fa-circle-o'></span></span>"
      it { expect(helper.task_state_with_icon(task.state)).to eq pending }
    end

    context "when state is pass" do
      let(:task) { create :task, state: "pass" }
      pass = "<span class=\"text-success\">Pass <span class='fa fa-check'></span></span>"
      it { expect(helper.task_state_with_icon(task.state)).to eq pass }
    end

    context "when state is failure" do
      let(:task) { create :task, state: "failure" }
      failure = "<span class=\"text-danger\">Failure <span class='fa fa-times'></span></span>"
      it { expect(helper.task_state_with_icon(task.state)).to eq failure }
    end
  end
end