# == Schema Information
#
# Table name: test_case_versions
#
#  id         :bigint           not null, primary key
#  project_id :bigint           not null
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :test_case_version do
    sequence(:title) { |n| "title #{n}" }
  end
end
