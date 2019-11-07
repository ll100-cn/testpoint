# == Schema Information
#
# Table name: issues
#
#  id              :bigint           not null, primary key
#  title           :string
#  content         :text
#  state           :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  milestone_id    :bigint
#  bak_creator_id  :bigint
#  bak_assignee_id :bigint
#  project_id      :bigint
#  last_edited_at  :datetime
#  creator_id      :bigint
#  assignee_id     :bigint
#  state_at        :datetime
#

FactoryBot.define do
  factory :issue do
    project
    title { "issue1" }
    content { "content of issue1" }
    state { "pending" }
    creator { create :member }
  end
end
