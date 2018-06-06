class AddAssigneeToIssue < ActiveRecord::Migration[5.2]
  def change
    remove_foreign_key :issues, column: :user_id
    add_reference :issues, :creator
    add_reference :issues, :assignee
  end
end
