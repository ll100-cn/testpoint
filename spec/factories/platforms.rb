# == Schema Information
#
# Table name: platforms
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  archived   :boolean          default(FALSE)
#

FactoryBot.define do
  factory :platform do
    name "platform name"
    project
  end
end
