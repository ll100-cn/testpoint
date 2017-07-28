class AddPlatformIdToTestCases < ActiveRecord::Migration[5.1]
  def change
    change_table :test_cases do |t|
      t.belongs_to :platform
    end
  end
end
