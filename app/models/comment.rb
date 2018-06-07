class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :issue
  has_many :attachments, as: :attachmentable
  accepts_nested_attributes_for :attachments, allow_destroy: true

  validates :content, presence: true

  scope :recent, -> { order("created_at DESC") }
  scope :history, -> { order("created_at ASC") }
end
