class RenameLastUpdatedAtToLastEditedAt < ActiveRecord::Migration[5.2]
  def change
    rename_column :issues, :last_updated_at, :last_edited_at
    rename_column :comments, :last_updated_at, :last_edited_at
  end
end
