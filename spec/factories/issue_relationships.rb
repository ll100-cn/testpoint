# == Schema Information
#
# Table name: issue_relationships
#
#  id         :bigint(8)        not null, primary key
#  target_id  :bigint(8)
#  source_id  :bigint(8)
#  category   :string
#  member_id  :bigint(8)
#  created_at :datetime
#  updated_at :datetime
#

FactoryBot.define do
  factory :issue_relationship do
    source { create :issue }
    target { create :issue }
  end
end
