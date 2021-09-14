# == Schema Information
#
# Table name: issue_templates
#
#  id                   :bigint           not null, primary key
#  name                 :string
#  project_id           :bigint           not null
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  lookup_by_build_form :boolean          default(TRUE)
#  title_suggestion     :string
#  content_suggestion   :string
#  default_label_id     :bigint
#  default_priority     :string
#

FactoryBot.define do
  factory :issue_template do
    name { "无法打开应用" }
  end
end
