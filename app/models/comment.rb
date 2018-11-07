# == Schema Information
#
# Table name: comments
#
#  id             :bigint(8)        not null, primary key
#  content        :text
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  user_id        :bigint(8)
#  issue_id       :bigint(8)
#  last_edited_at :datetime
#

class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :issue

  has_many :comment_attachments, dependent: :destroy
  accepts_nested_attributes_for :comment_attachments, allow_destroy: true
  has_many :attachments, as: :attachmentable, through: :comment_attachments, dependent: :destroy

  validates :content, presence: true

  before_save :update_edited_at, if: -> { will_save_change_to_content? && !new_record? }

  scope :recent, -> { order("created_at DESC") }
  scope :history, -> { order("created_at ASC") }

  def update_edited_at
    self.last_edited_at = Time.current
  end
end
