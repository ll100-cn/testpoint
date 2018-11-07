class AddLastUpdateAtToIssue < ActiveRecord::Migration[5.2]
  def change
    add_column :issues, :last_updated_at, :datetime
    add_column :comments, :last_updated_at, :datetime
  end
end
