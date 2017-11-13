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

FactoryGirl.define do
  factory :task do
    plan { create :plan }
    test_case { create :test_case }
    platform { create :platform }
  end
end
