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
#
class Storyboard < ApplicationRecord
  enumerize :main_axle, in: [ :LR, :TB ]

  belongs_to :project
  has_many :requirements

  validates :title, :main_axle, presence: true

  def archive
    if requirements.empty?
      destroy
    else
      errors.add(:base, 'Cannot archive storyboard with requirements exists')
    end
  end
end
