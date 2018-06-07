class PolymorphicAttachements < ActiveRecord::Migration[5.2]
  def change
    add_column :attachments, :title, :text
    add_column :attachments, :attachmentable_id, :bigint
    add_column :attachments, :attachmentable_type, :string
    add_index :attachments, :attachmentable_id
    add_index :attachments, :attachmentable_type
  end
end
