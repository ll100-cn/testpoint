# == Schema Information
#
# Table name: categories
#
#  id                      :bigint           not null, primary key
#  name                    :string
#  description             :text
#  color                   :string
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  project_id              :bigint
#  default_as_test_failure :boolean          default(FALSE)
#

FactoryBot.define do
  factory :category do
    name { "分类1" }
    description { "content of label1" }
    color { "#ace0ef" }
    project
  end
end
