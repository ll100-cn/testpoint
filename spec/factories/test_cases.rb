# == Schema Information
#
# Table name: test_cases
#
#  id         :bigint           not null, primary key
#  title      :string
#  content    :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  folder_id  :bigint
#  archived   :boolean          default(FALSE)
#  project_id :bigint
#

FactoryBot.define do
  factory :test_case do
    title { "user sign in" }
    sequence(:role_name) { |n| "role_name #{n}" }
    sequence(:scene_name) { |n| "scene_name #{n}" }
    content { "input username and password" }
    folder { create :folder }
    platforms { create_list :platform, 1 }
    project
  end
end
