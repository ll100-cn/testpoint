class RenameIssueFormToIssueInfo < ActiveRecord::Migration[6.0]
  def change
    rename_table :issue_forms, :issue_infos
  end
end
