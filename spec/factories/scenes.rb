# == Schema Information
#
# Table name: scenes
#
#  id            :bigint           not null, primary key
#  storyboard_id :bigint           not null
#  name          :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
FactoryBot.define do
  factory :scene do
    storyboard { nil }
    name { "MyString" }
  end
end
