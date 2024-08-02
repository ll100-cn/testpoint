# == Schema Information
#
# Table name: requirements
#
#  id            :bigint           not null, primary key
#  project_id    :bigint           not null
#  platform_ids  :bigint           default([]), is an Array
#  upstream_ids  :bigint           default([]), is an Array
#  title         :string
#  description   :text
#  roles         :string           default([]), is an Array
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  storyboard_id :bigint
#
FactoryBot.define do
  factory :requirement do
    title { "My Requirement Title" }
    description { "My Requirement Description" }
  end
end
