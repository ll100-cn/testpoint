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

class Component < ApplicationRecord
  has_ancestry

  has_many :test_cases
end
