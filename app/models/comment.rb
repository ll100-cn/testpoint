class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :issue

  validates :content, presence: true

  scope :recent, -> { order("created_at DESC") }
end
