require 'rails_helper'

RSpec.describe PageHelper, :type => :helper do

  describe "#task_state_class_name" do
    context "when state is pending" do
      it { expect(helper.task_state_class_name("pending")).to eq nil }
    end

    context "when state is pass" do
      it { expect(helper.task_state_class_name("pass")).to eq "text-success" }
    end

    context "when state is failure" do
      it { expect(helper.task_state_class_name("failure")).to eq "text-danger" }
    end
  end

end