class MigrateAttachments < ActiveRecord::Migration[5.2]

  def change
    issue_sql = <<-SQL
      UPDATE attachments
      SET attachmentable_type = 'Issue',
          attachmentable_id = issue_attachments.issue_id
      FROM issue_attachments
      WHERE issue_attachments.attachment_id = attachments.id
        AND attachments.attachmentable_id IS NULL
    SQL

    ActiveRecord::Base.connection.execute(issue_sql)

    task_sql = <<-SQL
      UPDATE attachments
      SET attachmentable_type = 'Task',
          attachmentable_id = task_attachments.task_id
      FROM task_attachments
      WHERE task_attachments.attachment_id = attachments.id
        AND attachments.attachmentable_id IS NULL
    SQL

    ActiveRecord::Base.connection.execute(task_sql)

    comment_sql = <<-SQL
      UPDATE attachments
      SET attachmentable_type = 'Comment',
          attachmentable_id = comment_attachments.comment_id
      FROM comment_attachments
      WHERE comment_attachments.attachment_id = attachments.id
        AND attachments.attachmentable_id IS NULL
    SQL

    ActiveRecord::Base.connection.execute(comment_sql)
  end
end
