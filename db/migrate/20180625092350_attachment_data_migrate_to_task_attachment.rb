class AttachmentDataMigrateToTaskAttachment < ActiveRecord::Migration[5.2]
  class Attachment < ActiveRecord::Base
  end

  class TaskAttachment < ActiveRecord::Base
  end

  def change
    Attachment.where(attachmentable_type: "Task").find_each do |attachment|
      if TaskAttachment.where.not(attachment_id: attachment.id).exists?
        TaskAttachment.create(attachment_id: attachment.id, task_id: attachment.attachmentable_id)
      end
    end
  end
end
