class AddMilestoneIdToIssue < ActiveRecord::Migration[5.2]
  def change
    add_column :issues, :milestone_id, :integer
  end
end
