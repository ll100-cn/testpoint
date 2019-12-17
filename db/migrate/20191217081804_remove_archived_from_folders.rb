class RemoveArchivedFromFolders < ActiveRecord::Migration[6.0]
  def change
    remove_column :folders, :archived, :boolean
  end
end
