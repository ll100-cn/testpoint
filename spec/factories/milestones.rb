# == Schema Information
#
# Table name: milestones
#
#  id           :bigint           not null, primary key
#  title        :string
#  published_at :datetime
#  description  :text
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  project_id   :bigint
#  archived_at  :datetime
#

FactoryBot.define do
  factory :milestone do
    title { "milestone1" }
    description { "description for milestone1" }
    published_at { 2.days.from_now }
    project
  end
end
