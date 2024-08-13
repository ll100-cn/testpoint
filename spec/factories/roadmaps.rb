# == Schema Information
#
# Table name: roadmaps
#
#  id         :bigint           not null, primary key
#  project_id :bigint           not null
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :roadmap do
    project { nil }
    title { "MyString" }
  end
end
