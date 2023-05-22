FactoryBot.define do
  factory :test_case_version do
    sequence(:title) { |n| "title #{n}" }
  end
end