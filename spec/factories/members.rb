# == Schema Information
#
# Table name: members
#
#  id         :bigint(8)        not null, primary key
#  role       :string
#  project_id :bigint(8)
#  user_id    :bigint(8)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  nickname   :string
#

FactoryBot.define do
  factory :member do
    project
    user

    trait :owner do
      role { "owner" }
    end

    trait :admin do
      role { "admin" }
    end

    trait :member do
      role { "member" }
    end
  end
end
