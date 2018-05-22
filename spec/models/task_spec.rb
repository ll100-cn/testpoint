# == Schema Information
#
# Table name: tasks
#
#  id           :integer          not null, primary key
#  test_case_id :integer
#  plan_id      :integer
#  state        :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  platform_id  :integer
#  issue_id     :integer
#  message      :text
#

require 'rails_helper'

RSpec.describe Task, type: :model do
  let(:task1) { create :task, state: "failure" }
  let(:task2) { create :task, state: "pending" }

  describe "#pending?" do
    context "not pending" do
      it { expect(task1.pending?).to eq false }
    end

    context "pending" do
      it { expect(task2.pending?).to eq true }
    end
  end

  describe "#completed?" do
    context "completed" do
      it { expect(task1.completed?).to eq true }
    end

    context "not completed" do
      it { expect(task2.completed?).to eq false }
    end
  end

end
