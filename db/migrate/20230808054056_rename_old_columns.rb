class RenameOldColumns < ActiveRecord::Migration[7.0]
  def change
    rename_column :test_cases, :folder_id, :bak_folder_id
    rename_table :platforms_test_cases, :bak_platforms_test_cases
    rename_table :test_case_label_links, :bak_test_case_label_links
  end
end
