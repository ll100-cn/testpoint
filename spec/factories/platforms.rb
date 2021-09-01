# == Schema Information
#
# Table name: platforms
#
#  id                  :bigint           not null, primary key
#  name                :string
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  archived            :boolean          default(FALSE)
#  project_id          :bigint
#  default_assignee_id :bigint
#

FactoryBot.define do
  factory :platform do
    name { "platform name" }
    project
  end
end
