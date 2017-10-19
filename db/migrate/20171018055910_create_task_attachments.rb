class CreateTaskAttachments < ActiveRecord::Migration[5.1]
  def change
    create_table :task_attachments do |t|
      t.belongs_to :task
      t.belongs_to :attachment
      t.text :content

      t.timestamps
    end
  end
end
