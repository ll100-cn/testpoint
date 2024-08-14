# == Schema Information
#
# Table name: requirements
#
#  id            :bigint           not null, primary key
#  project_id    :bigint           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  storyboard_id :bigint
#
FactoryBot.define do
  factory :requirement do
  end
end
