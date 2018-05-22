# == Schema Information
#
# Table name: plans
#
#  id         :integer          not null, primary key
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe Plan, type: :model do
  describe "#generate" do
    let(:test_case) { create :test_case }
    let(:plan) { create :plan }
    it "generate new task" do
      params = {
          test_case_ids: test_case.id
      }
      expect { plan.generate(params) }.to change{ Task.count }.by(1)
    end
  end
end
