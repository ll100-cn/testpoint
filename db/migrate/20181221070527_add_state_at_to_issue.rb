class AddStateAtToIssue < ActiveRecord::Migration[5.2]
  class Issue < ActiveRecord::Base; end

  def change
    add_column :issues, :state_at, :datetime

    Issue.where(state_at: nil).update_all("state_at=updated_at")
  end
end
