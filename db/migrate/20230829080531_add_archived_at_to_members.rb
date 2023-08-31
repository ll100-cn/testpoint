class AddArchivedAtToMembers < ActiveRecord::Migration[7.0]
  def change
    add_column :members, :archived_at, :datetime
  end
end
