# == Schema Information
#
# Table name: issue_relationships
#
#  id         :bigint           not null, primary key
#  target_id  :bigint
#  source_id  :bigint
#  category   :string
#  member_id  :bigint
#  created_at :datetime
#  updated_at :datetime
#

FactoryBot.define do
  factory :issue_relationship do
    source { create :issue }
    target { create :issue }
  end
end
