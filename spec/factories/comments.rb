FactoryBot.define do
  factory :comment do
    sequence(:content) { |n| "Comment #{n}" }
    user { create :user }
    issue { create :issue }
  end
end
