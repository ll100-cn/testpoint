class MigrateDataToAttachmentsFromTaskattachments < ActiveRecord::Migration[5.2]
  class TaskAttachment < ActiveRecord::Base
  end

  class Attachment < ActiveRecord::Base
  end

  def change
    Attachment.where(attachmentable_id: nil).find_each do |attachment|
      data_migration(attachment)
    end
  end

  def data_migration(attachment)
    return unless TaskAttachment.where(attachment_id: attachment.id).exists?
    task_attachment = TaskAttachment.find_by(attachment_id: attachment.id)
    attachment.update(attachmentable_id: task_attachment.task_id, attachmentable_type: "Task", title: task_attachment.content)
  end
end
