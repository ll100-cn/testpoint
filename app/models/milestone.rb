# == Schema Information
#
# Table name: milestones
#
#  id           :bigint           not null, primary key
#  title        :string
#  published_at :datetime
#  description  :text
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  project_id   :bigint
#  archived_at  :datetime
#

class Milestone < ApplicationRecord
  has_many :issues, dependent: :nullify
  has_many :attachments, as: :attachmentable, dependent: :nullify, inverse_of: :attachmentable
  has_many :plans
  belongs_to :project

  cleanup_column :title, :description

  validates :title, presence: true

  scope :ranked, -> { order(published_at: :desc) }
  scope :available, -> { where(archived_at: nil) }

  def published?
    published_at && published_at < Time.current
  end

  def archive
    update(archived_at: Time.current)
  end
end
