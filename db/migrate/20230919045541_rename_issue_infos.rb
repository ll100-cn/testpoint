class RenameIssueInfos < ActiveRecord::Migration[7.0]
  def change
    rename_table :issue_infos, :issue_surveys
  end
end
