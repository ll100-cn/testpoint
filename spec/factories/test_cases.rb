# == Schema Information
#
# Table name: test_cases
#
#  id           :integer          not null, primary key
#  title        :string
#  content      :text
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  component_id :integer
#  archived     :boolean          default(FALSE)
#

FactoryBot.define do
  factory :test_case do
    title "user sign in"
    content "input username and password"
    # component { create :component }
    platforms { create_list :platform, 1 }
    association :component
    # association :platforms
  end
end
