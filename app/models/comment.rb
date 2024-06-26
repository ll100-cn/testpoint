# == Schema Information
#
# Table name: comments
#
#  id             :bigint           not null, primary key
#  content        :text
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  issue_id       :bigint
#  last_edited_at :datetime
#  collapsed      :boolean          default(FALSE)
#  member_id      :bigint
#  comment_id     :bigint
#  display        :string           default("normal")
#

class Comment < ApplicationRecord
  enumerize :display, in: [ :important, :normal, :collapsed ]

  belongs_to :member
  belongs_to :issue, touch: true
  belongs_to :comment, optional: true
  has_many :comments

  has_many :attachments, as: :attachmentable, dependent: :nullify, inverse_of: :attachmentable, autosave: true

  validates :content, presence: true

  scope :recent, -> { order("created_at DESC") }
  scope :history, -> { order("created_at ASC") }

  after_create :change_issue_state_to_pending, if: -> { member == issue.creator && issue.state.waiting? }

  def update_with_author(params, member)
    assign_attributes(params)
    self.last_edited_at = Time.current if will_save_change_to_content?
    self.save
  end

  def change_issue_state_to_pending
    issue.update_with_author({ state: 'pending' }, member)
  end

  def attachments_params=(raw)
    array = raw.is_a?(Array) ? raw : raw.values
    new_attachment_ids = array.map { |it| it.symbolize_keys[:id] }
    attachment_repo = Attachment.where_any_of(
      Attachment.where(attachmentable_type: self.class.name, attachmentable_id: self.id),
      Attachment.where(attachmentable_id: nil)
    ).where(id: new_attachment_ids).index_by(&:id)

    new_attachments = array.map do |attrs|
      attrs = attrs.symbolize_keys
      attachment = attachment_repo[attrs[:id].to_i]
      attachment.assign_attributes(attrs)
      attachment
    end

    self.attachments = new_attachments
  end

  def convert(params)
    new_comment_id = params[:comment_id].presence
    if new_comment_id
      if !issue.comments.exists?(new_comment_id)
        errors.add(:comment_id, " 评论 ID 不存在于当前问题中")
        return false
      end

      if comments.exists?(new_comment_id)
        errors.add(:comment_id, "已有回复, 不能转换为回复")
        return false
      end

      new_comment = issue.comments.find(new_comment_id)
      if new_comment.comment_id
        errors.add(:comment_id, "当前 ID 是回复, 只能是评论的 ID")
        return false
      end
    end

    self.comment_id = new_comment_id
    save
  end
end
