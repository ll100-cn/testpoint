# == Schema Information
#
# Table name: comments
#
#  id             :bigint           not null, primary key
#  content        :text
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  issue_id       :bigint
#  last_edited_at :datetime
#  collapsed      :boolean          default(FALSE)
#  member_id      :bigint
#  comment_id     :bigint
#  display        :string           default("normal")
#

FactoryBot.define do
  factory :comment do
    sequence(:content) { |n| "Comment #{n}" }
    member
    issue
  end
end
