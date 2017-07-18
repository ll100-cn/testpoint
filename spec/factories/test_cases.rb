# == Schema Information
#
# Table name: test_cases
#
#  id         :integer          not null, primary key
#  title      :string
#  content    :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryGirl.define do
  factory :test_case do
    title "user sign in"
    content "input username and password"
  end
end
