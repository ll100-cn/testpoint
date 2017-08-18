# == Schema Information
#
# Table name: platforms
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Platform < ApplicationRecord
  has_and_belongs_to_many :test_cases
  validates :name, presence: true

  def to_label
    " #{name}"
  end
end
