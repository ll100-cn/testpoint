class MigrationIssueState < ActiveRecord::Migration[5.2]
  class Issue < ActiveRecord::Base; end
  def change
    Issue.where(state: "open").update_all(state: "pending")
    Issue.where(state: "solved").update_all(state: "resolved")
  end
end
