FactoryBot.define do
  factory :comment do
    sequence(:content) { |n| "Comment #{n}" }
    user
    issue
  end
end
