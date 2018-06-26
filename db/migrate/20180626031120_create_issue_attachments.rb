class CreateIssueAttachments < ActiveRecord::Migration[5.2]
  def change
    create_table :issue_attachments do |t|
      t.belongs_to :issue
      t.belongs_to :attachment
      t.timestamps
    end
  end
end
