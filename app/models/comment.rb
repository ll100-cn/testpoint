class Comment < ApplicationRecord
  validates :content, presence: true
  belongs_to :user
  belongs_to :issue

  scope :recent, -> { order("created_at DESC") }
end
