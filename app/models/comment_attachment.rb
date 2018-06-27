# == Schema Information
#
# Table name: comment_attachments
#
#  id            :bigint(8)        not null, primary key
#  comment_id    :bigint(8)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  attachment_id :bigint(8)
#

class CommentAttachment < ApplicationRecord
  belongs_to :comment
  belongs_to :attachment
end
