# == Schema Information
#
# Table name: tasks
#
#  id                :bigint           not null, primary key
#  test_case_id      :bigint
#  plan_id           :bigint
#  state             :string
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  message           :text
#  test_case_version :datetime
#  content           :text
#  phase_id          :bigint
#  ignore_at         :datetime
#

FactoryBot.define do
  factory :task do
    test_case { create :test_case }
  end
end
