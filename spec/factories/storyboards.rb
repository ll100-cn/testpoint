# == Schema Information
#
# Table name: storyboards
#
#  id          :bigint           not null, primary key
#  project_id  :bigint           not null
#  title       :string
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
FactoryBot.define do
  factory :storyboard do
    title { "My Storyboard Title" }
    description { "My Storyboard Description" }
  end
end
