# == Schema Information
#
# Table name: plans
#
#  id         :integer          not null, primary key
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryBot.define do
  factory :plan do
    sequence(:title) { |n| "Plan #{n}" }
    tasks { build_list :task, 2 }
  end
end
