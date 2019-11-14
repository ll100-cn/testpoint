# == Schema Information
#
# Table name: folders
#
#  id         :bigint           not null, primary key
#  name       :string
#  ancestry   :string
#  archived   :boolean          default(FALSE)
#  project_id :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryBot.define do
  factory :folder do
    name { "Folder Name" }
    project
  end
end
