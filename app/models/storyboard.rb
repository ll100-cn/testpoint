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
#
class Storyboard < ApplicationRecord
  belongs_to :project
  has_many :requirements

  validates :title, presence: true

  def archive
    if requirements.empty?
      destroy
    else
      errors.add(:base, 'Cannot archive storyboard with requirements exists')
    end
  end
end
