class AddPriorityToIssues < ActiveRecord::Migration[6.1]
  class Issue < ActiveRecord::Base; end

  def change
    add_column :issues, :priority, :string

    Issue.where(priority: nil).update_all(priority: :normal)
  end
end
