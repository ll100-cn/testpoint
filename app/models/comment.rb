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
#  collapsed      :boolean          default(FALSE)
#

class Comment < ApplicationRecord
  belongs_to :member
  belongs_to :issue

  has_many :attachments, as: :attachmentable, dependent: :nullify, inverse_of: :attachmentable

  validates :content, presence: true

  after_create :update_issue_last_edited_at

  scope :recent, -> { order("created_at DESC") }
  scope :history, -> { order("created_at ASC") }

  def update_with_editor(params, member)
    assign_attributes(params)
    self.last_edited_at = Time.current if will_save_change_to_content?
    self.save
  end

  def unfold
    update(collapsed: true)
  end

  def fold
    update(collapsed: false)
  end

  def update_issue_last_edited_at
    issue.update_attribute(:last_edited_at, Time.current)
  end
end
