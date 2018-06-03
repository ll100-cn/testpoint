FactoryBot.define do
  factory :milestone do
    title "milestone1"
    description "description for milestone1"
    start_time 2.days.from_now
    end_time 10.days.from_now
  end
end
