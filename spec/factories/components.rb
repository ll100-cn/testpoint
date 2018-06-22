# == Schema Information
#
# Table name: components
#
#  id         :bigint(8)        not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  ancestry   :string
#  archived   :boolean          default(FALSE)
#  project_id :bigint(8)
#

FactoryBot.define do
  factory :component do
    name "Component Name"
    project
  end
end
