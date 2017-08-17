class RemovePlatformIdFromTestCases < ActiveRecord::Migration[5.1]
  def change
    remove_column :test_cases, :platform_id
  end
end
