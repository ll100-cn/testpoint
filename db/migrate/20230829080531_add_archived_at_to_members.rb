class AddArchivedAtToMembers < ActiveRecord::Migration[7.0]
  def change
    add_column :members, :archived_at, :date
  end
end
