class CreateCommentAttachments < ActiveRecord::Migration[5.2]
  def change
    create_table :comment_attachments do |t|
      t.belongs_to :comment
      t.belongs_to :attachment
      t.timestamps
    end
  end
end
