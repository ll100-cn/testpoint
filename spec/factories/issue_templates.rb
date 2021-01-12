# == Schema Information
#
# Table name: issue_templates
#
#  id         :bigint           not null, primary key
#  name       :string
#  project_id :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryBot.define do
  factory :issue_template do
    name { "无法打开应用" }
  end
end
