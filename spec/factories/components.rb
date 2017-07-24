# == Schema Information
#
# Table name: components
#
#  id         :integer          not null, primary key
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  ancestry   :string
#

FactoryGirl.define do
  factory :component do
    title "Component Title"
  end
end
