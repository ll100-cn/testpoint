# == Schema Information
#
# Table name: milestones
#
#  id           :bigint           not null, primary key
#  title        :string
#  description  :text
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  project_id   :bigint
#  published_at :datetime
#

class Milestone < ApplicationRecord
  has_many :issues, dependent: :nullify
  belongs_to :project

  validates :title, presence: true

  scope :ranked, -> { order(published_at: :desc) }


  def published?
    published_at && published_at < DateTime.now
  end
end
