# == Schema Information
#
# Table name: task_attachments
#
#  id            :bigint(8)        not null, primary key
#  task_id       :bigint(8)
#  attachment_id :bigint(8)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class TaskAttachment < ApplicationRecord
  belongs_to :attachment
  belongs_to :task
end
