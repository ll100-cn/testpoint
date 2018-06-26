# == Schema Information
#
# Table name: platforms
#
#  id         :bigint(8)        not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  archived   :boolean          default(FALSE)
#  project_id :bigint(8)
#

FactoryBot.define do
  factory :platform do
    name "platform name"
    project
  end
end
