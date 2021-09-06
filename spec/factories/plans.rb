# == Schema Information
#
# Table name: plans
#
#  id           :bigint           not null, primary key
#  title        :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  archived     :boolean          default(FALSE)
#  start_at     :datetime
#  project_id   :bigint
#  creator_id   :bigint           not null
#  milestone_id :bigint
#

FactoryBot.define do
  factory :plan do
    sequence(:title) { |n| "Plan #{n}" }
    project
  end
end
