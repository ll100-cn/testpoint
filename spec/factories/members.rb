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
#

FactoryBot.define do
  factory :member do
    
  end
end
