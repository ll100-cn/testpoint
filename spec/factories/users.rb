# == Schema Information
#
# Table name: users
#
#  id                  :bigint           not null, primary key
#  email               :string           default(""), not null
#  remember_created_at :datetime
#  sign_in_count       :integer          default(0), not null
#  current_sign_in_at  :datetime
#  last_sign_in_at     :datetime
#  current_sign_in_ip  :inet
#  last_sign_in_ip     :inet
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  name                :string
#  superadmin          :boolean          default(FALSE)
#

FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    name { Faker::Name.name }

    trait :superadmin do
      superadmin { true }
    end
  end
end
