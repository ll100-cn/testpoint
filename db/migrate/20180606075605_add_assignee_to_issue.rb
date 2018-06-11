class AddAssigneeToIssue < ActiveRecord::Migration[5.2]
  def change
    add_reference :issues, :creator
    add_reference :issues, :assignee
  end
end
