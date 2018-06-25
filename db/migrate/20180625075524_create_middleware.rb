class CreateMiddleware < ActiveRecord::Migration[5.2]
  def change
    create_table :issue_attachment do |t|
      t.belongs_to :issue, foreign_key: true
      t.belongs_to :attachment, foreign_key: true
    end
    remove_column :task_attachments, :content, :text
  end
end
