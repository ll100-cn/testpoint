FactoryBot.define do
  factory :milestone do
    title "milestone1"
    description "description for milestone1"
    due_date 10.days.from_now
  end
end
