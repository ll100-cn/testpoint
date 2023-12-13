# == Schema Information
#
# Table name: issues
#
#  id                 :bigint           not null, primary key
#  title              :string
#  content            :text
#  state              :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  milestone_id       :bigint
#  bak_creator_id     :bigint
#  bak_assignee_id    :bigint
#  project_id         :bigint
#  last_edited_at     :datetime
#  creator_id         :bigint
#  assignee_id        :bigint
#  priority           :string
#  task_id            :bigint
#  label_ids_cache    :bigint           default([]), is an Array
#  category_id        :bigint
#  archived_at        :datetime
#  stage              :string
#  legacy_project_ids :integer          default([]), is an Array
#  trello_card_id     :string
#

FactoryBot.define do
  factory :issue do
    project
    title { "issue1" }
    content { "content of issue1" }
    state { "pending" }
    category
    creator { create :member }
  end
end
