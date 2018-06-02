class AddReferenceToIssue < ActiveRecord::Migration[5.2]
  def change
    remove_column :issues, :milestone_id, :integer
    add_reference :issues, :milestone, foreign_key: true
  end
end
