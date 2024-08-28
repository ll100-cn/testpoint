# == Schema Information
#
# Table name: storyboards
#
#  id          :bigint           not null, primary key
#  project_id  :bigint           not null
#  title       :string
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  main_axle   :string
#  positions   :json
#
class Storyboard < ApplicationRecord
  enumerize :main_axle, in: [ :LR, :TB ]

  belongs_to :project
  has_many :requirements
  has_many :scenes

  validates :title, :main_axle, presence: true

  scope :ranked, -> { order(:title) }

  def archive
    if requirements.empty?
      destroy
    else
      errors.add(:base, 'Cannot archive storyboard with requirements exists')
    end
  end
end
