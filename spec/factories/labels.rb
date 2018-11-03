# == Schema Information
#
# Table name: labels
#
#  id          :bigint(8)        not null, primary key
#  name        :string
#  description :text
#  color       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  project_id  :bigint(8)
#

FactoryBot.define do
  factory :label do
    name { "label1" }
    description { "content of label1" }
    color { "#ace0ef" }
    project
  end
end
