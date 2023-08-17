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
  has_many :attachments, as: :attachmentable, dependent: :nullify, inverse_of: :attachmentable
  has_many :plans
  belongs_to :project

  cleanup_column :title, :description

  validates :title, presence: true

  scope :ranked, -> { order(published_at: :desc) }

  def published?
    published_at && published_at < DateTime.now
  end
end
