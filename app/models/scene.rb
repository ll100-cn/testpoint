# == Schema Information
#
# Table name: scenes
#
#  id            :bigint           not null, primary key
#  storyboard_id :bigint           not null
#  name          :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Scene < ApplicationRecord
  belongs_to :storyboard
  has_many :requirements

  validates :name, presence: true
end
