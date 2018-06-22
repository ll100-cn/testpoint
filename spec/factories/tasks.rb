# == Schema Information
#
# Table name: tasks
#
#  id           :bigint(8)        not null, primary key
#  test_case_id :bigint(8)
#  plan_id      :bigint(8)
#  state        :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  platform_id  :bigint(8)
#  issue_id     :bigint(8)
#  message      :text
#  project_id   :bigint(8)
#

FactoryBot.define do
  factory :task do
    test_case { create :test_case }
    platform { create :platform }
  end
end
