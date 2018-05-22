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

  describe "#completed?" do
    context "completed" do
      let(:task) { create :task, state: "failure" }
      it { expect(task.completed?).to eq true }
    end

    context "not completed" do
      let(:task) { create :task, state: "pending" }
      it { expect(task.completed?).to eq false }
    end
  end

end
