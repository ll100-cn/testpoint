# == Schema Information
#
# Table name: comments
#
#  id         :bigint(8)        not null, primary key
#  content    :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint(8)
#  issue_id   :bigint(8)
#

FactoryBot.define do
  factory :comment do
    sequence(:content) { |n| "Comment #{n}" }
    user
    issue
  end
end
