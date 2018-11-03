# == Schema Information
#
# Table name: test_cases
#
#  id           :bigint(8)        not null, primary key
#  title        :string
#  content      :text
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  component_id :bigint(8)
#  archived     :boolean          default(FALSE)
#  project_id   :bigint(8)
#

FactoryBot.define do
  factory :test_case do
    title { "user sign in" }
    content { "input username and password" }
    component { create :component }
    platforms { create_list :platform, 1 }
    project
  end
end
