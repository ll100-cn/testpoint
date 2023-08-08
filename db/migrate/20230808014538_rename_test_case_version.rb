class RenameTestCaseVersion < ActiveRecord::Migration[7.0]
  def change
    rename_table :test_case_versions, :test_case_snapshots
  end
end
