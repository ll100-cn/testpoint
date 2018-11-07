# == Schema Information
#
# Table name: issues
#
#  id              :bigint(8)        not null, primary key
#  title           :string
#  content         :text
#  state           :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  milestone_id    :bigint(8)
#  creator_id      :bigint(8)
#  assignee_id     :bigint(8)
#  project_id      :bigint(8)
#  last_updated_at :datetime
#

FactoryBot.define do
  factory :issue do
    title { "issue1" }
    content { "content of issue1" }
    state { "open" }
    creator { create :user }
  end
end
