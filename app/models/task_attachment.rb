# == Schema Information
#
# Table name: task_attachments
#
#  id            :integer          not null, primary key
#  task_id       :integer
#  attachment_id :integer
#  content       :text
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class TaskAttachment < ApplicationRecord
  belongs_to :task
  belongs_to :attachment
end