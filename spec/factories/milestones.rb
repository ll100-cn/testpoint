# == Schema Information
#
# Table name: milestones
#
#  id          :bigint           not null, primary key
#  title       :string
#  end_time    :datetime
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  start_time  :datetime
#  project_id  :bigint
#

FactoryBot.define do
  factory :milestone do
    title { "milestone1" }
    description { "description for milestone1" }
    start_time { 2.days.from_now }
    end_time { 10.days.from_now }
    project
  end
end
