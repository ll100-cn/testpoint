# == Schema Information
#
# Table name: plans
#
#  id         :bigint(8)        not null, primary key
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  archived   :boolean          default(FALSE)
#  start_at   :datetime
#  project_id :bigint(8)
#

FactoryBot.define do
  factory :plan do
    sequence(:title) { |n| "Plan #{n}" }
    tasks { build_list :task, 2 }
    project
  end
end
