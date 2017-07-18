# == Schema Information
#
# Table name: plans
#
#  id         :integer          not null, primary key
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryGirl.define do
  factory :plan do
    title "Plan #{Date.current}"
  end
end
